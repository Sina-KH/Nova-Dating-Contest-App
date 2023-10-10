import { Identifier } from '@/helpers/aliases';
import { IUser, IUserGender, IUserProps, IUserSearchFilters, IUserStatus, UserModel } from '@/models/user';
import { ITag, ITagProps } from '@/models/tag';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { newUUID } from '@/helpers/stringHelpers';
import { ageToDate, calculateAge } from '@/helpers/dateHelpers';
import { Language } from '@/helpers/localization';

async function findByID(userID: Identifier<IUser>, props: IUserProps | string) {
    return UserModel.findOne(
        {
            _id: userID,
            status: IUserStatus.active
        },
        props
    );
}

async function findByPublicID(userID: Identifier<IUser>, props: IUserProps | string) {
    return UserModel.findOne(
        {
            pID: userID,
            status: IUserStatus.active
        },
        props
    );
}

async function upsert(userData: {
    id: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    language_code?: string;
}) {
    const userID = userData.id.toString();
    const existingUser = await UserModel.findOneAndUpdate(
        {
            _id: userID
        },
        {
            languageCode: userData.language_code,
            lastVisit: new Date()
        },
        {
            new: true
        }
    );
    if (existingUser) return existingUser;
    return UserModel.create({
        _id: userID,
        pID: newUUID(),
        firstName: userData.first_name,
        lastName: userData.last_name,
        username: userData.username,
        languageCode: userData.language_code
    });
}

async function setGender(userID: Identifier<IUser>, gender: IUserGender) {
    await UserModel.updateOne(
        {
            _id: userID
        },
        {
            gender: gender
        }
    );
}

async function setInterests(userID: Identifier<IUser>, interests: Identifier<ITag>[], props: IUserProps) {
    return (
        await UserModel.findOneAndUpdate(
            {
                _id: userID
            },
            {
                interests
            },
            {
                new: true,
                projection: props
            }
        )
    )?.toObject();
}

async function setStatus(userID: Identifier<IUser>, status: IUserStatus) {
    return UserModel.findOneAndUpdate(
        {
            _id: userID
        },
        {
            status
        },
        {
            new: true
        }
    );
}

interface EditUserUpdates {
    firstName: string;
    lastName: string;
    birthdate: Date;
    gender?: IUserGender;
    interests?: Identifier<ITag>[];
    profilePhotoObj?: object;
}
async function edit(
    userID: Identifier<IUser>,
    { firstName, lastName, birthdate, gender, interests, profilePhotoObj }: EditUserUpdates,
    props: IUserProps
) {
    let update: UpdateQuery<IUser> = {
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate
    };
    if (gender) update.gender = gender;
    if (interests) update.interests = interests;
    if (profilePhotoObj) update.photo = profilePhotoObj;
    return (
        await UserModel.findOneAndUpdate(
            {
                _id: userID
            },
            update,
            {
                new: true,
                projection: props
            }
        )
    )?.toObject();
}

async function setSearchFilters(userID: Identifier<IUser>, searchFilters: IUserSearchFilters) {
    await UserModel.updateOne(
        {
            _id: userID
        },
        {
            searchFilters
        }
    );
}

interface SearchProps {
    excludeIdentifiers?: Identifier<IUser>[];
    searchInterests?: Identifier<ITag>[];
    searchGenders?: IUserGender[];
    searchAgeFrom?: number;
    searchAgeTo?: number;
}
async function search(
    { excludeIdentifiers, searchInterests, searchGenders, searchAgeFrom, searchAgeTo }: SearchProps,
    language: Language
): Promise<Partial<IUser>[]> {
    const filters: FilterQuery<IUser> = {
        status: IUserStatus.active
    };
    if (excludeIdentifiers?.length) filters._id = { $nin: excludeIdentifiers };
    if (searchInterests?.length) {
        filters.interests = { $in: searchInterests };
    }
    if (searchGenders?.length) {
        filters.gender = { $in: searchGenders };
    }
    if (searchAgeFrom) {
        filters.birthdate = { $lte: ageToDate(searchAgeFrom) };
    }
    if (searchAgeTo) {
        filters.birthdate = {
            ...filters.birthdate,
            $gte: ageToDate(searchAgeTo)
        };
    }
    const users = await UserModel.aggregate([
        {
            $match: filters
        },
        {
            $sort: {
                lastVisit: -1
            }
        },
        {
            $limit: 10
        },
        {
            // populate interests
            $lookup: {
                from: 'tags',
                let: { interests: '$interests' },
                pipeline: [
                    { $match: { $expr: { $in: ['$_id', '$$interests'] } } },
                    {
                        $project: ITagProps.general.split(' ').reduce((pValue, cValue) => {
                            if (cValue === 'names') {
                                // localized name for interest
                                return {
                                    ...pValue,
                                    name: {
                                        $cond: [
                                            { $ifNull: ['$names.' + language, null] },
                                            '$names.' + language,
                                            '$names.en'
                                        ]
                                    }
                                };
                            }
                            return { ...pValue, [cValue]: 1 };
                        }, {})
                    }
                ],
                as: 'interests'
            }
        },
        {
            $project: (IUserProps.public + ' birthdate').split(' ').reduce(
                (pValue, cValue) => {
                    return { ...pValue, [cValue]: 1 };
                },
                {
                    _id: 0
                }
            )
        }
    ]);
    return users.map((it) => {
        return {
            ...it,
            age: it.birthdate ? calculateAge(it.birthdate) : undefined
        };
    });
}

const UserRepo = {
    findByID,
    findByPublicID,
    upsert,
    setGender,
    setInterests,
    setStatus,
    edit,
    setSearchFilters,

    search
};
export default UserRepo;
