import { IBotUpdate } from '@/models/botUpdate';
import { Exceptions } from '@/helpers/exceptions';
import UserRepo from '@/repos/userRepo';
import { sendBotMessage } from '@/logic/bot/sendBotMessage';
import { localized } from '@/helpers/stringHelpers';
import { DictionaryKeys } from '@/helpers/dictionaryKeys';

export async function processBotUpdate(botUpdate: IBotUpdate) {
    // ensure bot update is a telegram message
    const message = botUpdate.telegramUpdate?.message;
    if (!message) throw new Error(Exceptions.botUpdate_isNotMessage);
    // ensure message is sent in direct to the bot, and from a user
    const chat = message.chat;
    const from = message.from;
    if (!chat || !from || chat.id !== from.id) throw new Error(Exceptions.botUpdate_messageIsNotInDirectChat);
    if (from.is_bot) throw new Error(Exceptions.botUpdate_messageIsFromABot);
    // create user if not exists
    await UserRepo.upsert({
        id: 't_' + from.id,
        first_name: from.first_name,
        last_name: from.last_name,
        username: from.username,
        language_code: from.language_code
    });
    // check if message is '/start'
    if (message.text === '/start' || message.text === '/dating') {
        await sendBotMessage('t_' + from.id, {
            text:
                localized(DictionaryKeys.openTheApp) +
                '\n\n' +
                process.env.WEBAPP_URL +
                '\n\n' +
                localized(DictionaryKeys.setUsernamePlease),
            replyKeyboardMarkup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Nova Dating App',
                            web_app: {
                                url: process.env.WEBAPP_URL || ''
                            }
                        }
                    ]
                ]
            }
        });
    }
}
