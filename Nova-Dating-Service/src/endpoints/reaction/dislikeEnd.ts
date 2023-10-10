import IEnd, { IEndConfigAccess, IEndHead, IEndInput, IEndMethod, IEndOutput } from '@/endpoints/IEnd';
import { Identifier } from '@/helpers/aliases';
import { IUser } from '@/models/user';
import TestDataSpec from '@test/testData.spec';
import { reactUserLogic } from '@/logic/reaction/reactUserLogic';
import { IReactionStatus } from '@/models/reaction';

interface IReactionDislikeEndInput extends IEndInput {
    userPID: Identifier<IUser>;
}

interface IReactionDislikeEndResponse {}

const ReactionDislikeEnd: IEnd<IReactionDislikeEndInput, IReactionDislikeEndResponse> = {
    configuration: {
        access: IEndConfigAccess.logins
    },
    method: IEndMethod.POST,
    url: '/reaction/dislike',
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
        input: IReactionDislikeEndInput
    ): Promise<IEndOutput<IReactionDislikeEndResponse>> {
        await reactUserLogic(heads.loginObj!.userID!, input.userPID, IReactionStatus.disliked);
        return {
            statusCode: 200,
            response: {}
        };
    },
    docs: {
        name: 'Dislike a user',
        description: 'Called when a user dislikes another user',
        sampleInput: {
            userPID: TestDataSpec.users[1].pID
        }
    }
};

export default ReactionDislikeEnd;
