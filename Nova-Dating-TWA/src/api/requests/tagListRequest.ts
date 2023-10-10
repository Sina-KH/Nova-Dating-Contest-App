import { ApiRequest, ApiRequestMethod } from '@/api/requests/IApiRequest';
import { ITag, ITagType } from '@/types/ITag';

export class TagListRequest extends ApiRequest<{ type: ITagType }, { tags: ITag[] }> {
    path = 'tag/list';
    method = ApiRequestMethod.GET;

    input;
    constructor(input: { type: ITagType }) {
        super();
        this.input = input;
    }
}
