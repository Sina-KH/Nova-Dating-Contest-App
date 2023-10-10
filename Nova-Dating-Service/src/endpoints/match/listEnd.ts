import IEnd, { IEndConfigAccess, IEndHead, IEndInput, IEndMethod, IEndOutput } from '@/endpoints/IEnd';
import { ObjectIDType } from '@/helpers/aliases';
import { IMatch } from '@/models/match';
import Regex from '@/helpers/regex';
import { matchListLogic } from '@/logic/match/matchListLogic';

interface IMatchListEndInput extends IEndInput {
    // to paginate and receive items before this id
    before?: ObjectIDType<IMatch>;
}

interface IMatchListEndResponse {
    matches: Partial<IMatch>[];
}

const MatchListEnd: IEnd<IMatchListEndInput, IMatchListEndResponse> = {
    configuration: {
        access: IEndConfigAccess.logins
    },
    method: IEndMethod.GET,
    url: '/match/list',
    schema: {
        querystring: {
            type: 'object',
            properties: {
                before: { type: 'string', pattern: Regex.objectID }
            },
            required: []
        }
    },
    handler: async function (heads: IEndHead, input: IMatchListEndInput): Promise<IEndOutput<IMatchListEndResponse>> {
        const { matches } = await matchListLogic(heads.loginObj!.userID!, input.before);
        return {
            statusCode: 200,
            response: { matches }
        };
    },
    docs: {
        name: 'List of matches',
        description: 'List of matches for user, ordered desc',
        sampleInput: {}
    }
};

export default MatchListEnd;
