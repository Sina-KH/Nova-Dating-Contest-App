import IEnd, { IEndConfigAccess, IEndHead, IEndInput, IEndMethod, IEndOutput } from '@/endpoints/IEnd';
import { IUser } from '@/models/user';
import { getTokenLogic } from '@/logic/user/getTokenLogic';

interface IUserGetTokenEndInput extends IEndInput {
    hash: string;
}

interface IUserGetTokenEndResponse {
    session: {
        token: string;
    };
    user: Partial<IUser>;
}

const UserGetTokenEnd: IEnd<IUserGetTokenEndInput, IUserGetTokenEndResponse> = {
    configuration: {
        access: IEndConfigAccess.public
    },
    method: IEndMethod.POST,
    url: '/user/getToken',
    schema: {
        body: {
            type: 'object',
            properties: {
                hash: { type: 'string' }
            },
            required: ['hash']
        }
    },
    handler: async function (
        heads: IEndHead,
        input: IUserGetTokenEndInput
    ): Promise<IEndOutput<IUserGetTokenEndResponse>> {
        const { session, user } = await getTokenLogic(input.hash);
        return {
            statusCode: 200,
            response: {
                session,
                user
            }
        };
    },
    docs: {
        name: 'Get user token',
        description: 'Get token using hash received from telegram',
        sampleInput: {
            hash: encodeURI(
                'user={"id":12345,"first_name":"Sina","last_name":"KH","username":"SinaKhalili",' +
                    '"language_code":"en","allows_write_to_pm":true}&chat_instance=&chat_type=private' +
                    '&auth_date=1695479274&hash='
            )
        }
    }
};

export default UserGetTokenEnd;
