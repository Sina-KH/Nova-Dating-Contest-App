import { ApiRequest, ApiRequestMethod } from '@/api/requests/IApiRequest';
import { IUser } from '@/types/IUser';

export class UserGetTokenRequest extends ApiRequest<{ hash: string }, { session: { token: string }; user: IUser }> {
    path = 'user/getToken';
    method = ApiRequestMethod.POST;

    input;
    constructor(input: { hash: string }) {
        super();
        this.input = input;
    }
}
