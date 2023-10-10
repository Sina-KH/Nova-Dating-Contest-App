import IEnd, { IEndConfigAccess, IEndHead, IEndInput, IEndMethod, IEndOutput } from '@/endpoints/IEnd';
import { ITelegramUpdate } from '@/models/types/telegramTypes';
import { receivedBotUpdate } from '@/logic/bot/receivedBotUpdate';
import TestDataSpec from '@test/testData.spec';

interface IHookTelegramEndInput extends IEndInput, ITelegramUpdate {}

interface IHookTelegramEndResponse {}

const HookTelegramEnd: IEnd<IHookTelegramEndInput, IHookTelegramEndResponse> = {
    configuration: {
        access: IEndConfigAccess.public
    },
    method: IEndMethod.POST,
    url: '/hook/telegram_' + process.env.HOOK_KEY,
    schema: {
        body: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    handler: async function (
        heads: IEndHead,
        input: IHookTelegramEndInput
    ): Promise<IEndOutput<IHookTelegramEndResponse>> {
        // check telegram secret token
        const secretToken = heads.allHeaders?.['x-telegram-bot-api-secret-token'];
        if (!secretToken || secretToken !== process.env.HOOK_SECRET_TOKEN) {
            if (process.env.DOCS_ENV !== 'true') throw new Error();
        }
        await receivedBotUpdate({
            telegramUpdate: input
        });
        return {
            statusCode: 200,
            response: {}
        };
    },
    docs: {
        name: 'Telegram Bot Hook',
        description: 'Endpoint to receive telegram bot updates',
        sampleInput: {
            update_id: 1,
            message: {
                message_id: 0,
                date: 0,
                from: {
                    id: Number(TestDataSpec.users[1]._id.substring(2)),
                    is_bot: false,
                    first_name: TestDataSpec.users[1].firstName
                },
                chat: {
                    id: Number(TestDataSpec.users[1]._id.substring(2)),
                    type: 'private'
                }
            }
        }
    }
};

export default HookTelegramEnd;
