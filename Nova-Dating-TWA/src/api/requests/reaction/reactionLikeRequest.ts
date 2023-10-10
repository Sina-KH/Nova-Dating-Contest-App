import { ApiRequest, ApiRequestMethod } from '@/api/requests/IApiRequest';

interface Input {
    userPID: string;
}
export class ReactionLikeRequest extends ApiRequest<Input, {}> {
    path = 'reaction/like';
    method = ApiRequestMethod.POST;

    input;
    constructor(input: Input) {
        super();
        this.input = input;
    }
}
