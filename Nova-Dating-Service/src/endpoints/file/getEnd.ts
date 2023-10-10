import IEnd, { IEndConfigAccess, IEndHead, IEndInput, IEndMethod, IEndOutput } from '@/endpoints/IEnd';
import { IFileResponse } from '@/helpers/aliases';
import { fileGetLogic } from '@/logic/file/fileGetLogic';

interface IFileGetEndInput extends IEndInput {
    hash: string;
    pt: string;
}

type IFileGetEndResponse = IFileResponse | null;

const FileGetEnd: IEnd<IFileGetEndInput, IFileGetEndResponse> = {
    configuration: {
        access: IEndConfigAccess.public
    },
    method: IEndMethod.GET,
    url: '/file',
    schema: {
        querystring: {
            type: 'object',
            properties: {
                hash: { type: 'string' },
                pt: { type: 'string' }
            },
            required: ['hash']
        }
    },
    handler: async function (heads: IEndHead, input: IFileGetEndInput): Promise<IEndOutput<IFileGetEndResponse>> {
        const response = await fileGetLogic(input.hash, input.pt);
        return {
            statusCode: 299,
            response
        };
    },
    docs: {
        name: 'Get File',
        description: 'Request to receive a file by hash',
        sampleInput: {
            hash: 'hash_here',
            pt: 'm1000'
        }
    }
};

export default FileGetEnd;
