import { Identifier } from '@/helpers/aliases';
import { IUser, IUserProps } from '@/models/user';
import UserRepo from '@/repos/userRepo';
import ReactionRepo from '@/repos/reactionRepo';
import { IReactionProps } from '@/models/reaction';
import { Language } from '@/helpers/localization';

export async function exploreUsersLogic(
    userID: Identifier<IUser>,
    language: Language
): Promise<{ users: Partial<IUser>[] }> {
    const user = await UserRepo.findByID(userID, IUserProps.searchFilters);
    if (!user) throw new Error();

    // find users who this user reacted them, before
    const hadReactionToUserIdentifiers = await ReactionRepo.findByFirstUser(userID, IReactionProps.secondUser);

    // prepare search props
    const searchProps = {
        excludeIdentifiers: [userID].concat(hadReactionToUserIdentifiers.map((it) => it.secondUser)),
        searchInterests: user.searchFilters.searchInterests,
        searchGenders: user.searchFilters.searchGenders,
        searchAgeFrom: user.searchFilters.searchAgeFrom,
        searchAgeTo: user.searchFilters.searchAgeTo
    };

    // search users
    const users = await UserRepo.search(searchProps, language);

    return {
        users
    };
}
