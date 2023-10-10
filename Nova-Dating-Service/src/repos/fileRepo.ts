import { FileModel, IFile, IFileStatus } from '@/models/file';
import { Identifier, ObjectIDType } from '@/helpers/aliases';
import { IUser } from '@/models/user';

async function create(doc: IFile): Promise<IFile> {
    return await FileModel.create(doc);
}

async function findByID(fileID: ObjectIDType<IFile>): Promise<IFile | null> {
    return FileModel.findOne({
        _id: fileID,
        status: IFileStatus.active
    });
}

async function findByHash(hash: string): Promise<IFile | null> {
    return FileModel.findOne({
        hash,
        status: IFileStatus.active
    });
}

async function removeByUser(userID: Identifier<IUser>) {
    FileModel.updateOne(
        {
            user: userID,
            status: IFileStatus.active
        },
        {
            status: IFileStatus.removed
        }
    );
}

const FileRepo = {
    create,
    findByID,
    findByHash,
    removeByUser
};
export default FileRepo;
