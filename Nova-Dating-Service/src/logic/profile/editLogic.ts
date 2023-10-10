import { Identifier } from '@/helpers/aliases';
import { IUser, IUserGender, IUserProps } from '@/models/user';
import UserRepo from '@/repos/userRepo';
import { fileUploadLogic } from '@/logic/file/fileUploadLogic';
import { IFileType, IFileUseType } from '@/models/file';
import { ITag, ITagProps, ITagType } from '@/models/tag';
import { tagValidationLogic } from '@/logic/tag/tagValidationLogic';
import TagRepo from '@/repos/tagRepo';
import { Language } from '@/helpers/localization';

export async function profileEditLogic(
    userID: Identifier<IUser>,
    firstName: string,
    lastName: string,
    birthdate: Date,
    gender?: IUserGender,
    interests?: Identifier<ITag>[],
    photo?: any
) {
    if (interests?.length) await tagValidationLogic(interests, ITagType.interests);
    const profilePhotoObj = photo
        ? await fileUploadLogic(photo, IFileType.image, IFileUseType.profilePhoto, userID)
        : undefined;
    const updates = {
        firstName,
        lastName,
        birthdate,
        gender,
        interests,
        profilePhotoObj
    };
    const user = await UserRepo.edit(userID, updates, IUserProps.self);
    if (!user) throw new Error();
    return {
        ...user,
        interests: await TagRepo.findByIdentifiers(
            <Identifier<ITag>[]>user.interests,
            ITagType.interests,
            ITagProps.general,
            <Language>user.languageCode
        )
    };
}
