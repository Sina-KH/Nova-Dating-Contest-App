import { Schema, model } from 'mongoose';
import { schemaToProps } from '@/helpers/schemaHelpers';
import { Identifier, LocalizedString } from '@/helpers/aliases';

export enum ITagType {
    interests = 1
}

export enum ITagStatus {
    active = 1
}

export interface ITag {
    _id?: Identifier<ITag>;

    type: ITagType;
    icon: string;
    names: LocalizedString;
    status: ITagStatus;

    createdAt?: Date;
    updatedAt?: Date;

    to?: (props: ITagProps) => Partial<ITag>;
}

const tagSchema = new Schema<ITag>(
    {
        _id: { type: String },
        type: { type: Number, index: true },
        icon: String,
        names: Schema.Types.Mixed,
        status: Number
    },
    {
        timestamps: true,
        versionKey: false
    }
);
tagSchema.methods.to = schemaToProps;
tagSchema.index({
    type: 1,
    status: 1
});
tagSchema.index({
    type: 1,
    status: 1,
    _id: 1
});

export const TagModel = model<ITag>('tag', tagSchema);

export enum ITagProps {
    _id = '_id',
    general = 'type icon names'
}
