import { IReaction, IReactionProps, IReactionStatus } from '@/models/reaction';
import ReactionRepo from '@/repos/reactionRepo';
import MatchRepo from '@/repos/matchRepo';
import { IMatchStatus } from '@/models/match';
import { matchHappenedLogic } from '@/logic/match/matchHappenedLogic';

// called after each like/dislike to update match list if required.
export async function matchCheckLogic(newReaction: IReaction) {
    switch (newReaction.status) {
        case IReactionStatus.liked:
            const otherSideReaction = await ReactionRepo.findByFirstAndSecondUser(
                newReaction.secondUser,
                newReaction.firstUser,
                IReactionProps.status
            );
            if (otherSideReaction && otherSideReaction.status === IReactionStatus.liked) {
                const users = [newReaction.firstUser.toString(), newReaction.secondUser.toString()].sort();
                // both side like each other, check for match
                const existingMatch = await MatchRepo.upsert({
                    firstUser: users[0],
                    secondUser: users[1],
                    status: IMatchStatus.matched
                });
                if (existingMatch) {
                    // they are already matched
                } else {
                    // new match happened!
                    await matchHappenedLogic(users);
                }
            }
            break;
        case IReactionStatus.disliked:
            // unMatch users if where matched before!
            const users = [newReaction.firstUser.toString(), newReaction.secondUser.toString()].sort();
            await MatchRepo.unMatch(users[0], users[1]);
            break;
    }
}
