import { IBotUpdate } from '@/models/botUpdate';
import BotUpdateRepo from '@/repos/botUpdateRepo';
import { processBotUpdate } from '@/logic/bot/processBotUpdate';

export async function receivedBotUpdate(botUpdate: IBotUpdate) {
    if (process.env.DOCS_ENV === 'true') return;
    await BotUpdateRepo.insert(botUpdate);
    processBotUpdate(botUpdate).then();
}
