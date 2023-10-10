import { FastifySchema } from 'fastify/types/schema';
import { IUser, IUserRole } from '@/models/user';
import { Identifier, ObjectIDType } from '@/helpers/aliases';
import { Language } from '@/helpers/localization';

export enum IEndConfigAccess {
    systemRoles = 0,
    public = 1,
    // login users
    logins = 2
}

export interface IEndConfig {
    access: IEndConfigAccess;
    systemRoles?: IUserRole[];
}

export enum IEndMethod {
    GET = 'GET',
    POST = 'POST'
}

type IEndUrl = string;

export interface IEndHead {
    loginObj?: {
        userID?: Identifier<IUser>;
        lang?: Language;
    };
    allHeaders?: { [key: string]: string };

    ip: string;
}

export interface IEndInput {}

export interface IEndOutput<T> {
    statusCode: number;
    response: T;
    message?: string;
}

export interface IEndDocs<T> {
    name: string;
    description: string;
    sampleInput: T;
    enums?: { [key: string]: any };
}

export default interface IEnd<I extends IEndInput, O> {
    configuration: IEndConfig;
    method: IEndMethod;
    url: IEndUrl;
    schema: FastifySchema;
    handler: (heads: IEndHead, input: I) => Promise<IEndOutput<O>>;
    docs: IEndDocs<I>;
}

// pagination services ////////////////////////////////
export interface IEndPaginateInput extends IEndInput {
    page: number;
    limit: number;
}

export interface IEndPaginateResponse<T> {
    data: T[];
    count: number;
}

///////////////////////////////////////////////////////
