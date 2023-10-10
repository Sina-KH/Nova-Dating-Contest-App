import jwt from 'jsonwebtoken';
import { Exceptions } from '@/helpers/exceptions';
import { Identifier } from '@/helpers/aliases';
import { IUser } from '@/models/user';

export interface IJWTTokenPayload {
    userID?: Identifier<IUser>; // user id
    lang?: string; // language code
    exp: number;
}

export async function verifyJWTToken(token: string = ''): Promise<IJWTTokenPayload> {
    return new Promise((resolve, reject) => {
        if (!process.env.JWT_SECRET) throw Error();
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) reject(Error(Exceptions.invalidJWTToken));
            let payload = <IJWTTokenPayload>decoded;
            resolve(payload);
        });
    });
}

export async function signJWTToken(payload: IJWTTokenPayload): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!process.env.JWT_SECRET) throw Error();
        jwt.sign(payload, process.env.JWT_SECRET, (err, decoded) => {
            if (err) reject(err);
            resolve(<string>decoded);
        });
    });
}
