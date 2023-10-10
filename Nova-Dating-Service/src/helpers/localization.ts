import { Exceptions } from './exceptions';
import { DictionaryKeys } from '@/helpers/dictionaryKeys';

const en = {
    [Exceptions.notAuthorized]: 'You are not authorized',
    [Exceptions.badRequest]: 'Bad Request',
    [DictionaryKeys.openTheApp]: 'Open the dating mini-app right here, and enjoy finding new friends. 🍟🍷⚽️🙊',
    [DictionaryKeys.youGotAMatch]: '🎉 Your new match! 🥳',
    [DictionaryKeys.chatLink]: 'Start the chat right now! 😜',
    [DictionaryKeys.setUsernamePlease]:
        'Please make sure you have a username on your account, so whenever you match with someone, they can receive your account link. ' +
        'Users without username and with restricted privacy settings, may fail to share their connection link with match parties!'
};

export enum Language {
    en = 'en'
}

const Localization: { [key: string]: any } = {
    [Language.en]: en
};
export default Localization;
