import { Identifier } from '@/helpers/aliases';
import { IUser } from '@/models/user';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { ITelegramReplyKeyboardMarkup } from '@/models/types/telegramTypes';

export async function sendBotMessage(
    userID: Identifier<IUser>,
    message: {
        text: string;
        photo?: { photoPath?: string; photoURL?: string };
        replyKeyboardMarkup?: ITelegramReplyKeyboardMarkup;
    },
    parse_mode?: 'Markdown'
) {
    if (process.env.DOCS_ENV === 'true') return;

    if (!userID.startsWith('t_')) return;
    const telegramID = userID.substring(2);

    const { text, photo, replyKeyboardMarkup } = message;

    // prepare message data
    let data = new FormData();

    // fill chat_id and text
    data.append('chat_id', telegramID);
    data.append('text', text);

    // check if photo passed
    if (photo?.photoURL) data.append('photo', photo.photoURL);
    else if (photo?.photoPath) data.append('photo', fs.createReadStream(photo.photoPath));

    // reply keyboard markup
    if (replyKeyboardMarkup) data.append('reply_markup', JSON.stringify(replyKeyboardMarkup));

    if (parse_mode) data.append('parse_mode', parse_mode);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.telegram.org/bot' + process.env.BOT_TOKEN + '/sendMessage',
        headers: {
            ...data.getHeaders()
        },
        data: data
    };

    axios
        .request(config)
        .then((response) => {
            //console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
}
