import { IMatch, IMatchProps, IMatchStatus, MatchModel } from '@/models/match';
import { Identifier, ObjectIDType } from '@/helpers/aliases';
import { IUser, IUserProps } from '@/models/user';
import { FilterQuery, Types } from 'mongoose';

async function upsert(doc: IMatch) {
    return MatchModel.findOneAndUpdate(
        {
            firstUser: doc.firstUser,
            secondUser: doc.secondUser,
            status: doc.status
        },
        doc,
        {
            upsert: true
        }
    );
}

async function unMatch(firstUser: Identifier<IUser>, secondUser: Identifier<IUser>) {
    return MatchModel.updateOne(
        {
            firstUser: firstUser,
            secondUser: secondUser,
            status: IMatchStatus.matched
        },
        {
            status: IMatchStatus.unmatched
        }
    );
}

export async function findByUsers(
    firstUser: Identifier<IUser>,
    secondUser: Identifier<IUser>,
    props: IMatchProps,
    userProps: IUserProps | string
): Promise<Partial<IMatch> | null> {
    const matches = await MatchModel.aggregate([
        {
            $match: {
                firstUser,
                secondUser,
                status: IMatchStatus.matched
            }
        },
        {
            $limit: 1
        },
        {
            $lookup: {
                from: 'users',
                let: { firstUser: '$firstUser' },
                pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$firstUser'] } } },
                    {
                        $project: userProps.split(' ').reduce((pValue, cValue) => {
                            return { ...pValue, [cValue]: 1 };
                        }, {})
                    }
                ],
                as: 'firstUser'
            }
        },
        {
            $unwind: {
                path: '$firstUser',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'users',
                let: { secondUser: '$secondUser' },
                pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$secondUser'] } } },
                    {
                        $project: userProps.split(' ').reduce((pValue, cValue) => {
                            return { ...pValue, [cValue]: 1 };
                        }, {})
                    }
                ],
                as: 'secondUser'
            }
        },
        {
            $unwind: {
                path: '$secondUser',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: props.split(' ').reduce((pValue, cValue) => {
                return { ...pValue, [cValue]: 1 };
            }, {})
        }
    ]);
    return matches.length ? matches[0] : null;
}

async function findByUser(
    userID: Identifier<IUser>,
    before: ObjectIDType<IMatch> | undefined,
    props: IMatchProps,
    userProps: IUserProps | string
) {
    const matchFilters: FilterQuery<IMatch> = {
        $or: [{ firstUser: userID }, { secondUser: userID }],
        status: IMatchStatus.matched
    };
    if (before) matchFilters._id = { $lt: before };
    return MatchModel.aggregate([
        {
            $match: matchFilters
        },
        {
            $sort: {
                _id: -1
            }
        },
        {
            $limit: 10
        },
        {
            $lookup: {
                from: 'users',
                let: { firstUser: '$firstUser' },
                pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$firstUser'] } } },
                    {
                        $project: userProps.split(' ').reduce((pValue, cValue) => {
                            return { ...pValue, [cValue]: 1 };
                        }, {})
                    }
                ],
                as: 'firstUser'
            }
        },
        {
            $unwind: {
                path: '$firstUser',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'users',
                let: { secondUser: '$secondUser' },
                pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$secondUser'] } } },
                    {
                        $project: userProps.split(' ').reduce((pValue, cValue) => {
                            return { ...pValue, [cValue]: 1 };
                        }, {})
                    }
                ],
                as: 'secondUser'
            }
        },
        {
            $unwind: {
                path: '$secondUser',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: props.split(' ').reduce((pValue, cValue) => {
                return { ...pValue, [cValue]: 1 };
            }, {})
        }
    ]);
}

async function findByIDAndUser(
    _id: ObjectIDType<IMatch>,
    userID: Identifier<IUser>,
    props: IMatchProps,
    userProps: IUserProps
) {
    const matches = await MatchModel.aggregate([
        {
            $match: {
                _id: new Types.ObjectId(<string>_id),
                $or: [
                    {
                        firstUser: userID
                    },
                    {
                        secondUser: userID
                    }
                ],
                status: IMatchStatus.matched
            }
        },
        {
            $limit: 1
        },
        {
            $lookup: {
                from: 'users',
                let: { firstUser: '$firstUser' },
                pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$firstUser'] } } },
                    {
                        $project: userProps.split(' ').reduce((pValue, cValue) => {
                            return { ...pValue, [cValue]: 1 };
                        }, {})
                    }
                ],
                as: 'firstUser'
            }
        },
        {
            $unwind: {
                path: '$firstUser',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'users',
                let: { secondUser: '$secondUser' },
                pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$secondUser'] } } },
                    {
                        $project: userProps.split(' ').reduce((pValue, cValue) => {
                            return { ...pValue, [cValue]: 1 };
                        }, {})
                    }
                ],
                as: 'secondUser'
            }
        },
        {
            $unwind: {
                path: '$secondUser',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: props.split(' ').reduce((pValue, cValue) => {
                return { ...pValue, [cValue]: 1 };
            }, {})
        }
    ]);
    return matches.length ? matches[0] : null;
}

const ReactionRepo = {
    upsert,
    unMatch,
    findByUsers,
    findByUser,
    findByIDAndUser
};
export default ReactionRepo;
