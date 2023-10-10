import { ApiRequest, ApiRequestMethod } from '@/api/requests/IApiRequest';

export class ProfileSetGenderRequest extends ApiRequest<{ gender: string }, {}> {
    path = 'profile/setGender';
    method = ApiRequestMethod.POST;

    input;
    constructor(input: { gender: string }) {
        super();
        this.input = input;
    }
}
