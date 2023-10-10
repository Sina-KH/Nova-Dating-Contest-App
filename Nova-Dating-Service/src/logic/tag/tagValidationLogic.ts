// validate tags
import { Identifier } from '@/helpers/aliases';
import { ITag, ITagProps, ITagType } from '@/models/tag';
import TagRepo from '@/repos/tagRepo';
import { Exceptions } from '@/helpers/exceptions';

export async function tagValidationLogic(tags: Identifier<ITag>[], type: ITagType) {
    const tagObjs = await TagRepo.findByIdentifiers(tags, type, ITagProps._id);
    if (tagObjs.length < tags.length) throw new Error(Exceptions.badRequest);
}
