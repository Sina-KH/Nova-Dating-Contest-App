import { Types } from 'mongoose';

const USER_1 = 't_12345';
const USER_2 = 't_123456';
const MATCH_1 = new Types.ObjectId('652417e600f9568cea717b28');

export default {
    users: [
        {
            _id: USER_1,
            pID: 'user1_public_identifier',
            firstName: 'Sina',
            lastName: 'Khalili',
            languageCode: 'en',
            gender: 'male',
            interests: ['i_photography'],
            status: 1,
            searchFilters: {
                searchInterests: ['i_photography'],
                searchGenders: ['female']
            }
        },
        {
            _id: USER_2,
            pID: 'user2_public_identifier',
            firstName: 'Micheal',
            lastName: 'Ananas',
            languageCode: 'en',
            gender: 'female',
            interests: ['i_photography'],
            status: 1,
            searchFilters: {
                searchInterests: ['i_photography'],
                searchGenders: ['male']
            }
        }
    ],
    tags: [
        {
            _id: 'i_cats',
            type: 1,
            names: {
                en: 'Cats'
            },
            icon: '/assets/images/tags/i_cats.png',
            status: 1
        }
    ],
    matches: [
        {
            _id: MATCH_1,
            firstUser: USER_1,
            secondUser: USER_2,
            status: 1
        }
    ]
};
