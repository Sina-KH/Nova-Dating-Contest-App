import { Identifier } from '@/helpers/aliases';
import { IUser, IUserGender } from '@/models/user';
import UserRepo from '@/repos/userRepo';

export async function setGenderLogic(userID: Identifier<IUser>, gender: IUserGender) {
    await UserRepo.setGender(userID, gender);
}
