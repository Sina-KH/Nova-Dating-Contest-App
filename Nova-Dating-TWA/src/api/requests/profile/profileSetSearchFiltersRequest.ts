import { ApiRequest, ApiRequestMethod } from '@/api/requests/IApiRequest';

interface Input {
    searchInterests: string[];
    searchGenders: string[];
    searchAgeFrom: number;
    searchAgeTo: number;
}
export class ProfileSetSearchFiltersRequest extends ApiRequest<Input, {}> {
    path = 'profile/setSearchFilters';
    method = ApiRequestMethod.POST;

    input;
    constructor(input: Input) {
        super();
        this.input = input;
    }
}
