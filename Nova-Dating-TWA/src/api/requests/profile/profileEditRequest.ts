import { ApiRequest, ApiRequestMethod } from '@/api/requests/IApiRequest';
import { IUser } from '@/types/IUser';

interface Input {
    firstName: string;
    lastName: string;
    birthdate: string;
    photo?: File;
    gender?: string;
    interests?: string;
}

export class ProfileEditRequest extends ApiRequest<Input, { user: IUser }> {
    path = 'profile/edit';
    method = ApiRequestMethod.FORM_DATA;

    input;
    constructor(input: Input) {
        super();
        this.input = input;
    }
}
