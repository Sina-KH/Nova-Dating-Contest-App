import { Identifier, ObjectIDType } from '@/helpers/aliases';
import { IUser, IUserProps } from '@/models/user';
import { IMatch, IMatchProps } from '@/models/match';
import MatchRepo from '@/repos/matchRepo';
import { calculateAge } from '@/helpers/dateHelpers';

export async function matchListLogic(userID: Identifier<IUser>, before?: ObjectIDType<IMatch>) {
    const matches = await MatchRepo.findByUser(
        userID,
        before,
        IMatchProps.users,
        IUserProps.matchedUsers + ' birthdate'
    );
    return {
        matches: matches.map((match) => {
            return {
                ...match,
                firstUser: {
                    ...match.firstUser,
                    age: match.firstUser.birthdate ? calculateAge(match.firstUser.birthdate) : undefined
                },
                secondUser: {
                    ...match.secondUser,
                    age: match.secondUser.birthdate ? calculateAge(match.secondUser.birthdate) : undefined
                }
            };
        })
    };
}
