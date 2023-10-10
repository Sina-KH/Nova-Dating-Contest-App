import { Identifier, ObjectIDType } from '@/helpers/aliases';
import { IUser, IUserProps } from '@/models/user';
import { IMatch, IMatchProps } from '@/models/match';
import MatchRepo from '@/repos/matchRepo';
import { Exceptions } from '@/helpers/exceptions';
import { localized } from '@/helpers/stringHelpers';
import { DictionaryKeys } from '@/helpers/dictionaryKeys';
import { Language } from '@/helpers/localization';
import { IFile } from '@/models/file';
import { sendBotMessage } from '@/logic/bot/sendBotMessage';

export async function matchRequestLinkLogic(
    userID: Identifier<IUser>,
    matchID: ObjectIDType<IMatch>,
    language: Language
) {
    const match = await MatchRepo.findByIDAndUser(matchID, userID, IMatchProps.users, IUserProps.matchedUsers);
    if (!match) throw new Error(Exceptions.badRequest);

    // prepare match text message
    const peerUser = userID === match.firstUser._id ? match.secondUser : match.firstUser;

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
    const message = localized(DictionaryKeys.chatLink, language) + '\n\n' + connectionLink + usernameConnectionLink;

    // prepare photo data
    const peerPhotoHash = (<IFile>(<unknown>peerUser.photo))?.hash;
    const peerPhotoURL = peerPhotoHash ? process.env.API_PATH + `file?hash=${peerPhotoHash}` : undefined;

    // trigger bot message send
    sendBotMessage(userID, { text: message, photo: { photoURL: peerPhotoURL } }, 'Markdown')
        .then(() => {})
        .catch((e) => {
            console.log(e);
        });
}
