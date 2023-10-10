import { ApiRequest, ApiRequestMethod } from '@/api/requests/IApiRequest';
import { IUser } from '@/types/IUser';

export class ProfileSetInterestsRequest extends ApiRequest<{ interests: string[] }, { user: IUser }> {
    path = 'profile/setInterests';
    method = ApiRequestMethod.POST;

    input;
    constructor(input: { interests: string[] }) {
        super();
        this.input = input;
    }
}
