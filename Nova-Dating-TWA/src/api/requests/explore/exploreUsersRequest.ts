import { ApiRequest, ApiRequestMethod } from '@/api/requests/IApiRequest';
import { IUser } from '@/types/IUser';

export class ExploreUsersRequest extends ApiRequest<
    {},
    {
        users: Partial<IUser>[];
    }
> {
    path = 'explore/users';
    method = ApiRequestMethod.GET;

    input;
    constructor(input: {}) {
        super();
        this.input = input;
    }
}
