import IEnd, { IEndConfigAccess, IEndHead, IEndInput, IEndMethod, IEndOutput } from '@/endpoints/IEnd';
import { IUser } from '@/models/user';
import { exploreUsersLogic } from '@/logic/explore/exploreUsersLogic';
import { Language } from '@/helpers/localization';

interface IExploreUsersEndInput extends IEndInput {}

interface IExploreUsersEndResponse {
    users: Partial<IUser>[];
}

const ExploreUsersEnd: IEnd<IExploreUsersEndInput, IExploreUsersEndResponse> = {
    configuration: {
        access: IEndConfigAccess.logins
    },
    method: IEndMethod.GET,
    url: '/explore/users',
    schema: {
        querystring: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    handler: async function (
        heads: IEndHead,
        input: IExploreUsersEndInput
    ): Promise<IEndOutput<IExploreUsersEndResponse>> {
        const { users } = await exploreUsersLogic(heads.loginObj!.userID!, heads.loginObj?.lang || Language.en);
        return {
            statusCode: 200,
            response: {
                users
            }
        };
    },
    docs: {
        name: 'Explore Users',
        description: 'Explore users based on interests',
        sampleInput: {}
    }
};

export default ExploreUsersEnd;
