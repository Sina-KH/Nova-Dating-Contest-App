import { ApiRequest, ApiRequestMethod } from '@/api/requests/IApiRequest';

interface Input {
    userPID: string;
}
export class ReactionDislikeRequest extends ApiRequest<Input, {}> {
    path = 'reaction/dislike';
    method = ApiRequestMethod.POST;

    input;
    constructor(input: Input) {
        super();
        this.input = input;
    }
}
