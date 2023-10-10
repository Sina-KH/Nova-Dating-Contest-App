import IEnd, { IEndConfigAccess, IEndHead, IEndInput, IEndMethod, IEndOutput } from '@/endpoints/IEnd';
import { Identifier } from '@/helpers/aliases';
import { ITag } from '@/models/tag';
import TestDataSpec from '@test/testData.spec';
import { setInterestsLogic } from '@/logic/profile/setInterestsLogic';

interface IProfileSetInterestsEndInput extends IEndInput {
    interests: Identifier<ITag>[];
}

interface IProfileSetInterestsEndResponse {}

const ProfileSetInterestsEnd: IEnd<IProfileSetInterestsEndInput, IProfileSetInterestsEndResponse> = {
    configuration: {
        access: IEndConfigAccess.logins
    },
    method: IEndMethod.POST,
    url: '/profile/setInterests',
    schema: {
        body: {
            type: 'object',
            properties: {
                interests: { type: 'array', items: { type: 'string' } }
            },
            required: ['interests']
        }
    },
    handler: async function (
        heads: IEndHead,
        input: IProfileSetInterestsEndInput
    ): Promise<IEndOutput<IProfileSetInterestsEndResponse>> {
        const user = await setInterestsLogic(heads.loginObj!.userID!, input.interests);
        return {
            statusCode: 200,
            response: {
                user
            }
        };
    },
    docs: {
        name: 'Set Interests',
        description: 'Set interests in profile',
        sampleInput: {
            interests: [TestDataSpec.tags[0]._id]
        }
    }
};

export default ProfileSetInterestsEnd;
