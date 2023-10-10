import IEnd, { IEndConfigAccess, IEndHead, IEndInput, IEndMethod, IEndOutput } from '@/endpoints/IEnd';
import { ObjectIDType } from '@/helpers/aliases';
import { IMatch } from '@/models/match';
import Regex from '@/helpers/regex';
import { matchRequestLinkLogic } from '@/logic/match/matchRequestLinkLogic';
import TestDataSpec from '@test/testData.spec';
import { Language } from '@/helpers/localization';

interface IMatchRequestLinkEndInput extends IEndInput {
    matchID: ObjectIDType<IMatch>;
}

interface IMatchRequestLinkEndResponse {}

const MatchRequestLinkEnd: IEnd<IMatchRequestLinkEndInput, IMatchRequestLinkEndResponse> = {
    configuration: {
        access: IEndConfigAccess.logins
    },
    method: IEndMethod.GET,
    url: '/match/requestLink',
    schema: {
        querystring: {
            type: 'object',
            properties: {
                matchID: { type: 'string', pattern: Regex.objectID }
            },
            required: ['matchID']
        }
    },
    handler: async function (
        heads: IEndHead,
        input: IMatchRequestLinkEndInput
    ): Promise<IEndOutput<IMatchRequestLinkEndResponse>> {
        await matchRequestLinkLogic(heads.loginObj!.userID!, input.matchID, <Language>heads.loginObj!.lang);
        return {
            statusCode: 200,
            response: {}
        };
    },
    docs: {
        name: 'Request match link to chat',
        description: 'Request to receive chat link',
        sampleInput: {
            matchID: TestDataSpec.matches[0]._id
        }
    }
};

export default MatchRequestLinkEnd;
