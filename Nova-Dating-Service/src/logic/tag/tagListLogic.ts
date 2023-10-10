import { ITagType } from '@/models/tag';
import TagRepo from '@/repos/tagRepo';
import { Language } from '@/helpers/localization';

export async function tagListLogic(type: ITagType, language: Language) {
    return TagRepo.list(type, language);
}
