import { IReaction, IReactionProps, ReactionModel } from '@/models/reaction';
import { Identifier } from '@/helpers/aliases';
import { IUser } from '@/models/user';

async function upsert(doc: IReaction) {
    return ReactionModel.findOneAndUpdate(
        {
            firstUser: doc.firstUser,
            secondUser: doc.secondUser
        },
        doc,
        {
            new: true,
            upsert: true
        }
    );
}

async function findByFirstUser(firstUserID: Identifier<IUser>, props: IReactionProps) {
    return ReactionModel.find(
        {
            firstUser: firstUserID
        },
        props
    );
}

async function findByFirstAndSecondUser(
    firstUserID: Identifier<IUser>,
    secondUserID: Identifier<IUser>,
    props: IReactionProps
) {
    return ReactionModel.findOne(
        {
            firstUser: firstUserID,
            secondUser: secondUserID
        },
        props
    );
}

const ReactionRepo = {
    upsert,
    findByFirstUser,
    findByFirstAndSecondUser
};
export default ReactionRepo;
