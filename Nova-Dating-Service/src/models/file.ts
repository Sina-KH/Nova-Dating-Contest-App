import { model, Schema } from 'mongoose';
import { schemaToProps } from '@/helpers/schemaHelpers';
import { Identifier } from '@/helpers/aliases';
import { IUser } from '@/models/user';

export enum IFileType {
    image = 'image'
}

export enum IFileUseType {
    profilePhoto = 'profilePhoto'
}

export enum IFileStatus {
    active = 1,
    removed = 2
}

export interface IFile {
    _id?: Schema.Types.ObjectId;

    name: string;
    mimeType: string;
    hash: string;
    size: number;

    path: string;

    fileType: IFileType;
    useType: IFileUseType;

    user?: Identifier<IUser>;

    status: IFileStatus;

    i?: {
        w: number;
        h: number;
    };

    createdAt?: Date;
    updatedAt?: Date;

    to?: (props: IFileProps) => Partial<IFile>;
}

const fileSchema = new Schema<IFile>(
    {
        name: String,
        mimeType: String,
        hash: { type: String, index: true, unique: true },
        size: Number,

        path: String,

        fileType: String,
        useType: String,

        user: String,

        status: Number,

        i: {
            w: Number,
            h: Number
        }
    },
    {
        timestamps: true
    }
);
fileSchema.methods.to = schemaToProps;
fileSchema.index({
    hash: 1,
    status: 1
});

export const FileModel = model<IFile>('file', fileSchema);

export enum IFileProps {
    general = '_id name mimeType hash size fileType useType'
}
