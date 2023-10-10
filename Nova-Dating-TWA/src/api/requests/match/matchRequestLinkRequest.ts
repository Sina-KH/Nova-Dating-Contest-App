import { ApiRequest, ApiRequestMethod } from '@/api/requests/IApiRequest';
import { IMatch } from '@/types/IMatch';

export class MatchRequestLinkRequest extends ApiRequest<{ matchID: string }, {}> {
    path = 'match/requestLink';
    method = ApiRequestMethod.GET;

    input;
    constructor(input: { matchID: string }) {
        super();
        this.input = input;
    }
}
