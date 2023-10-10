import IEnd, { IEndConfigAccess, IEndHead, IEndInput, IEndMethod, IEndOutput } from '@/endpoints/IEnd';
import { ITag, ITagType } from '@/models/tag';
import { tagListLogic } from '@/logic/tag/tagListLogic';

interface ITagListEndInput extends IEndInput {
    type: ITagType;
}

interface ITagListEndResponse {
    tags: Partial<ITag>[];
}

const TagListEnd: IEnd<ITagListEndInput, ITagListEndResponse> = {
    configuration: {
        access: IEndConfigAccess.logins
    },
    method: IEndMethod.GET,
    url: '/tag/list',
    schema: {
        querystring: {
            type: 'object',
            properties: {
                type: { type: 'number', enum: [ITagType.interests] }
            },
            required: []
        }
    },
    handler: async function (heads: IEndHead, input: ITagListEndInput): Promise<IEndOutput<ITagListEndResponse>> {
        const tags = await tagListLogic(input.type, heads.loginObj!.lang!);
        return {
            statusCode: 200,
            response: {
                tags
            }
        };
    },
    docs: {
        name: 'List of tags',
        description: 'Get list of tags like interests and so on...',
        sampleInput: {
            type: ITagType.interests
        }
    }
};

export default TagListEnd;
