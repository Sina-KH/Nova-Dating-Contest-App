import { Identifier } from '@/helpers/aliases';
import { IUser, IUserSearchFilters } from '@/models/user';
import { ITagType } from '@/models/tag';
import { tagValidationLogic } from '@/logic/tag/tagValidationLogic';
import UserRepo from '@/repos/userRepo';

export async function setSearchFiltersLogic(user: Identifier<IUser>, searchFilters: IUserSearchFilters) {
    await tagValidationLogic(searchFilters.searchInterests, ITagType.interests);
    await UserRepo.setSearchFilters(user, searchFilters);
}
