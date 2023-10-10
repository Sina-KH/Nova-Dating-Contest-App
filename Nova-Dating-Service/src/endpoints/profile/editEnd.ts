import IEnd, { IEndConfigAccess, IEndHead, IEndInput, IEndMethod, IEndOutput } from '@/endpoints/IEnd';
import { IUser, IUserGender } from '@/models/user';
import { profileEditLogic } from '@/logic/profile/editLogic';
import TestDataSpec from '@test/testData.spec';

interface IProfileEditEndInput extends IEndInput {
    firstName: string;
    lastName: string;
    birthdate: string;
    photo: any;
    gender?: IUserGender;
    interests?: string; // comma-separated Identifier<ITag>
}

interface IProfileEditEndResponse {
    user: Partial<IUser>;
}

const ProfileEditEnd: IEnd<IProfileEditEndInput, IProfileEditEndResponse> = {
    configuration: {
        access: IEndConfigAccess.logins
    },
    method: IEndMethod.POST,
    url: '/profile/edit',
    schema: {
        body: {
            type: 'object',
            properties: {
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                birthdate: { type: 'string', format: 'date-time' },
                photo: { type: 'object' },
                gender: { type: 'string', enum: [IUserGender.male, IUserGender.female, IUserGender.beyondBinary] },
                interests: { type: 'string' }
            },
            required: ['firstName', 'lastName', 'birthdate']
        }
    },
    handler: async function (
        heads: IEndHead,
        input: IProfileEditEndInput
    ): Promise<IEndOutput<IProfileEditEndResponse>> {
        const user = await profileEditLogic(
            heads.loginObj!.userID!,
            input.firstName,
            input.lastName,
            new Date(input.birthdate),
            input.gender,
            input.interests?.split(','),
            input.photo
        );
        return {
            statusCode: 200,
            response: {
                user
            }
        };
    },
    docs: {
        name: 'Set Gender',
        description: 'Set gender in profile',
        sampleInput: {
            firstName: 'Sina',
            lastName: 'KH',
            birthdate: new Date(new Date().getTime() - 27 * 365 * 24 * 60 * 60 * 1000).toISOString(),
            photo: 'FORM_DATA__PROFILE_IMAGE_HERE',
            gender: IUserGender.male,
            interests: [TestDataSpec.tags[0]._id].join(',')
        }
    }
};

export default ProfileEditEnd;
