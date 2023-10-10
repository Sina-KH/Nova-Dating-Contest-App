import { Identifier } from '@/helpers/aliases';
import { IUser, IUserProps } from '@/models/user';
import { userNotifyLogic } from '@/logic/notify/userNotifyLogic';
import MatchRepo from '@/repos/matchRepo';
import { IMatchProps } from '@/models/match';
import { sendBotMessage } from '@/logic/bot/sendBotMessage';
import { localized } from '@/helpers/stringHelpers';
import { DictionaryKeys } from '@/helpers/dictionaryKeys';
import { Language } from '@/helpers/localization';
import { IFile } from '@/models/file';
import { calculateAge } from '@/helpers/dateHelpers';

// called whenever two users are newly matched
export async function matchHappenedLogic(userIDs: Identifier<IUser>[]) {
    let match = await MatchRepo.findByUsers(
        userIDs[0],
        userIDs[1],
        IMatchProps.users,
        // languageCode is used to create bot messages and will be removed from final response
        IUserProps.matchedUsers + ' birthdate languageCode'
    );
    if (!match) throw new Error();

    // extract first user and second user
    const firstUser = <Partial<IUser>>match.firstUser;
    const secondUser = <Partial<IUser>>match.secondUser;
    if (!firstUser || !secondUser) throw new Error();

    // extract and remove language codes from final response
    const languageCodes = {
        [firstUser._id!]: firstUser.languageCode,
        [secondUser._id!]: secondUser.languageCode
    };
    delete firstUser.languageCode;
    delete secondUser.languageCode;
    const peerUsers = {
        [firstUser._id!]: secondUser,
        [secondUser._id!]: firstUser
    };

    // set age on match object and update it
    match = {
        ...match,
        firstUser: {
            ...firstUser,
            age: firstUser.birthdate ? calculateAge(firstUser.birthdate!) : undefined
        },
        secondUser: {
            ...secondUser,
            age: secondUser.birthdate ? calculateAge(secondUser.birthdate!) : undefined
        }
    };
    delete firstUser.birthdate;
    delete secondUser.birthdate;

    // send match object on socket io
    for (const userID of userIDs) {
        await userNotifyLogic(userID, {
            event: 'match',
            data: {
                match: match
            }
        });

        // prepare match text message
        const peerUser = peerUsers[userID];
        const peerUserFullName = ((peerUser.firstName || '') + ' ' + (peerUser.lastName || '')).trim();

        // mark-down link to peer user
        const connectionLink = peerUser._id?.startsWith('t_')
            ? '[' + peerUserFullName + '](tg://user?id=' + peerUser._id?.substring(2) + ')'
            : peerUserFullName;
        if (!peerUser._id?.startsWith('t_')) {
            console.log('error in peer user _id,', {
                peerUser
            });
        }
        const usernameConnectionLink = peerUser.username ? '\n@' + peerUser.username : '';

        // message to send
        const message =
            localized(DictionaryKeys.youGotAMatch, <Language>languageCodes[userID]) +
            '\n\n' +
            connectionLink +
            usernameConnectionLink;

        // prepare photo data
        const peerPhotoHash = (<IFile>(<unknown>peerUser.photo))?.hash;
        const peerPhotoURL = peerPhotoHash ? process.env.API_PATH + `file?hash=${peerPhotoHash}` : undefined;

        // trigger bot message send
        const messageData = { text: message, photo: { photoURL: peerPhotoURL } };
        console.log('Sending match message', messageData);
        sendBotMessage(userID, messageData, 'Markdown')
            .then(() => {})
            .catch((e) => {
                console.log(e);
            });
    }
}
