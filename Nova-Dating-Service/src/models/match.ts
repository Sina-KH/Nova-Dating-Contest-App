import { Schema, model } from 'mongoose';
import { schemaToProps } from '@/helpers/schemaHelpers';
import { Identifier } from '@/helpers/aliases';
import { IUser } from '@/models/user';

export enum IMatchStatus {
    matched = 1,
    unmatched = 2
}

export interface IMatch {
    _id?: Schema.Types.ObjectId;

    firstUser: Identifier<IUser> | Partial<IUser>;
    secondUser: Identifier<IUser> | Partial<IUser>;
    status: IMatchStatus;

    createdAt?: Date;
    updatedAt?: Date;

    to?: (props: IMatchProps) => Partial<IMatch>;
}

const matchSchema = new Schema<IMatch>(
    {
        firstUser: String,
        secondUser: String,
        status: Number
    },
    {
        timestamps: true,
        versionKey: false
    }
);
matchSchema.methods.to = schemaToProps;
matchSchema.index({
    firstUser: 1,
    secondUser: 1,
    status: 1
});

export const MatchModel = model<IMatch>('match', matchSchema);

export enum IMatchProps {
    users = 'firstUser secondUser status'
}
