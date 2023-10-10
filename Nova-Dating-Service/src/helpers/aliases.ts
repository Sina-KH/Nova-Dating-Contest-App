import { Schema, Types } from 'mongoose';
import { ReadStream } from 'fs';
import { Server } from 'socket.io';

// used for string `_id` properties
export type Identifier<T> = string;

// used for object id `_id` properties
export type ObjectIDType<T> = Schema.Types.ObjectId | Types.ObjectId | Partial<T>;

export type LocalizedString = { [lang: string]: string };

export interface IFileResponse {
    mimeType: string;
    media: ReadStream;
}

export interface IGlobal {
    io: Server;
}
