import { Schema, model } from 'mongoose';
import { schemaToProps } from '@/helpers/schemaHelpers';
import { ITelegramUpdate } from '@/models/types/telegramTypes';

export interface IBotUpdate {
    _id?: Schema.Types.ObjectId;

    telegramUpdate?: ITelegramUpdate;

    createdAt?: Date;
    updatedAt?: Date;

    to?: (props: IBotUpdateProps) => Partial<IBotUpdate>;
}

const botUpdateSchema = new Schema<IBotUpdate>(
    {
        telegramUpdate: Schema.Types.Mixed
    },
    {
        timestamps: true
    }
);
botUpdateSchema.methods.to = schemaToProps;

export const BotUpdateModel = model<IBotUpdate>('bot_update', botUpdateSchema);

export enum IBotUpdateProps {}
