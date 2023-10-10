import { BotUpdateModel, IBotUpdate } from '@/models/botUpdate';

async function insert(doc: IBotUpdate) {
    return BotUpdateModel.create(doc);
}

const TagRepo = {
    insert
};
export default TagRepo;
