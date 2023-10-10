import IEnd, { IEndConfigAccess, IEndHead, IEndInput, IEndMethod, IEndOutput } from '@/endpoints/IEnd';
import { Identifier } from '@/helpers/aliases';
import { IUser } from '@/models/user';
import TestDataSpec from '@test/testData.spec';
import { reactUserLogic } from '@/logic/reaction/reactUserLogic';
import { IReactionStatus } from '@/models/reaction';

interface IReactionLikeEndInput extends IEndInput {
    userPID: Identifier<IUser>;
}

interface IReactionLikeEndResponse {}

const ReactionLikeEnd: IEnd<IReactionLikeEndInput, IReactionLikeEndResponse> = {
    configuration: {
        access: IEndConfigAccess.logins
    },
    method: IEndMethod.POST,
    url: '/reaction/like',
    schema: {
        body: {
            type: 'object',
            properties: {
                userPID: { type: 'string' }
            },
            required: ['userPID']
        }
    },
    handler: async function (
        heads: IEndHead,
        input: IReactionLikeEndInput
    ): Promise<IEndOutput<IReactionLikeEndResponse>> {
        await reactUserLogic(heads.loginObj!.userID!, input.userPID, IReactionStatus.liked);
        return {
            statusCode: 200,
            response: {}
        };
    },
    docs: {
        name: 'Like a user',
        description: 'Called when a user likes another user',
        sampleInput: {
            userPID: TestDataSpec.users[1].pID
        }
    }
};

export default ReactionLikeEnd;
