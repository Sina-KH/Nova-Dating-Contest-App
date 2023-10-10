import { Schema, model } from 'mongoose';
import { schemaToProps } from '@/helpers/schemaHelpers';
import { Identifier } from '@/helpers/aliases';
import { IUser } from '@/models/user';

export enum IReactionStatus {
    liked = 1,
    disliked = 2
}

export interface IReaction {
    _id?: Schema.Types.ObjectId;

    firstUser: Identifier<IUser>;
    secondUser: Identifier<IUser>;

    status: IReactionStatus;

    createdAt?: Date;
    updatedAt?: Date;

    to?: (props: IReactionProps) => Partial<IReaction>;
}

const reactionSchema = new Schema<IReaction>(
    {
        firstUser: String,
        secondUser: String,
        status: Number
    },
    {
        timestamps: false,
        versionKey: false
    }
);
reactionSchema.methods.to = schemaToProps;
reactionSchema.index({
    firstUser: 1,
    secondUser: 1,
    status: 1
});

export const ReactionModel = model<IReaction>('reaction', reactionSchema);

export enum IReactionProps {
    secondUser = 'secondUser',
    status = 'status'
}
