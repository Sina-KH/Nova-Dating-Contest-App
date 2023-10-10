import { Identifier } from '@/helpers/aliases';
import { IUser, IUserProps } from '@/models/user';
import { validateUserVisibilityLogic } from '@/logic/user/validateUserVisibilityLogic';
import { IReactionStatus } from '@/models/reaction';
import ReactionRepo from '@/repos/reactionRepo';
import UserRepo from '@/repos/userRepo';
import { Exceptions } from '@/helpers/exceptions';
import { matchCheckLogic } from '@/logic/match/matchCheckLogic';

export async function reactUserLogic(
    userID: Identifier<IUser>,
    secondUserPublicID: Identifier<IUser>,
    reactionStatus: IReactionStatus
) {
    await validateUserVisibilityLogic(userID, secondUserPublicID);
    const secondUser = await UserRepo.findByPublicID(secondUserPublicID, IUserProps._id);
    if (!secondUser?._id) throw new Error(Exceptions.badRequest);
    const reaction = await ReactionRepo.upsert({
        firstUser: userID,
        secondUser: secondUser._id,
        status: reactionStatus
    });
    await matchCheckLogic(reaction);
}
