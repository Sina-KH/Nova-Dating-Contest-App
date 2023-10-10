import { Identifier, IGlobal } from '@/helpers/aliases';
import { IUser } from '@/models/user';

export interface IUserNotification<T> {
    event: 'match';
    data: T;
}

export async function userNotifyLogic<T>(userID: Identifier<IUser>, notification: IUserNotification<T>) {
    (<IGlobal>(<unknown>global)).io?.to('u_' + userID.toString()).emit(notification.event, notification.data);
}
