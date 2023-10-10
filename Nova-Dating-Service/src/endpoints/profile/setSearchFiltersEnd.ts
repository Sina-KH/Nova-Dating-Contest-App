import IEnd, { IEndConfigAccess, IEndHead, IEndInput, IEndMethod, IEndOutput } from '@/endpoints/IEnd';
import { Identifier } from '@/helpers/aliases';
import { ITag } from '@/models/tag';
import { IUserGender } from '@/models/user';
import TestDataSpec from '@test/testData.spec';
import { setSearchFiltersLogic } from '@/logic/profile/setSearchFiltersLogic';

interface IProfileSetSearchFiltersEndInput extends IEndInput {
    searchInterests: Identifier<ITag>[];
    searchGenders: IUserGender[];
    searchAgeFrom?: number;
    searchAgeTo?: number;
}

interface IProfileSetSearchFiltersEndResponse {}

const ProfileSetSearchFiltersEnd: IEnd<IProfileSetSearchFiltersEndInput, IProfileSetSearchFiltersEndResponse> = {
    configuration: {
        access: IEndConfigAccess.logins
    },
    method: IEndMethod.POST,
    url: '/profile/setSearchFilters',
    schema: {
        body: {
            type: 'object',
            properties: {
                searchInterests: { type: 'array', items: { type: 'string' } },
                searchGenders: {
                    type: 'array',
                    items: { type: 'string', enum: [IUserGender.male, IUserGender.female, IUserGender.beyondBinary] }
                },
                searchAgeFrom: { type: 'integer', minimum: 18, maximum: 100 },
                searchAgeTo: { type: 'integer', minimum: 18, maximum: 100 }
            },
            required: ['searchInterests', 'searchGenders']
        }
    },
    handler: async function (
        heads: IEndHead,
        input: IProfileSetSearchFiltersEndInput
    ): Promise<IEndOutput<IProfileSetSearchFiltersEndResponse>> {
        await setSearchFiltersLogic(heads.loginObj!.userID!, {
            searchInterests: input.searchInterests,
            searchGenders: input.searchGenders,
            searchAgeFrom: input.searchAgeFrom,
            searchAgeTo: input.searchAgeTo
        });
        return {
            statusCode: 200,
            response: {}
        };
    },
    docs: {
        name: 'Set Search Filters',
        description: 'Set search filters for user',
        sampleInput: {
            searchInterests: [TestDataSpec.tags[0]._id],
            searchGenders: [IUserGender.female]
        }
    }
};

export default ProfileSetSearchFiltersEnd;
