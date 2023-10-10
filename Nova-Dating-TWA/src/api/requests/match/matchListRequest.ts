import { ApiRequest, ApiRequestMethod } from '@/api/requests/IApiRequest';
import { IMatch } from '@/types/IMatch';

export class MatchListRequest extends ApiRequest<
    { before?: string },
    {
        matches: IMatch[];
    }
> {
    path = 'match/list';
    method = ApiRequestMethod.GET;

    input;
    constructor(input: {}) {
        super();
        this.input = input;
    }
}
