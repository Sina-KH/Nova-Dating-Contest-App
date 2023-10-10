import IEnd, { IEndConfigAccess, IEndHead, IEndInput, IEndMethod, IEndOutput } from '@/endpoints/IEnd';
import { IUserGender } from '@/models/user';
import { setGenderLogic } from '@/logic/profile/setGenderLogic';

interface IProfileSetGenderEndInput extends IEndInput {
    gender: IUserGender;
}

interface IProfileSetGenderEndResponse {}

const ProfileSetGenderEnd: IEnd<IProfileSetGenderEndInput, IProfileSetGenderEndResponse> = {
    configuration: {
        access: IEndConfigAccess.logins
    },
    method: IEndMethod.POST,
    url: '/profile/setGender',
    schema: {
        body: {
            type: 'object',
            properties: {
                gender: { type: 'string', enum: [IUserGender.male, IUserGender.female, IUserGender.beyondBinary] }
            },
            required: ['gender']
        }
    },
    handler: async function (
        heads: IEndHead,
        input: IProfileSetGenderEndInput
    ): Promise<IEndOutput<IProfileSetGenderEndResponse>> {
        await setGenderLogic(heads.loginObj!.userID!, input.gender);
        return {
            statusCode: 200,
            response: {}
        };
    },
    docs: {
        name: 'Set Gender',
        description: 'Set gender in profile',
        sampleInput: {
            gender: IUserGender.male
        }
    }
};

export default ProfileSetGenderEnd;
