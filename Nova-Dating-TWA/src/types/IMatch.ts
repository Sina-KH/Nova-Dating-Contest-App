import { IUser } from '@/types/IUser';

export interface IMatch {
    _id: string;
    firstUser: Partial<IUser>;
    secondUser: Partial<IUser>;

    linkSent?: boolean;
}
