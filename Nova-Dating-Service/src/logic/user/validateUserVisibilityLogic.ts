import { Identifier } from '@/helpers/aliases';
import { IUser } from '@/models/user';
import { Exceptions } from '@/helpers/exceptions';

// Check if a user is visible to another user, or not. For example, it can be `false` if user is blocked!
export async function validateUserVisibilityLogic(userID: Identifier<IUser>, secondUserPublicID: Identifier<IUser>) {
    // We don't have block or similar limitations, yet.
    // If we have, we can throw an exception here:
    //  throw new Error(Exceptions.ANYTHING)
}
