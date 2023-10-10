import Localization, { Language } from './localization';
import { v4 as UUIDv4 } from 'uuid';

export function randomString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function randomStringExcept(length: number, except: string): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = except;
    while (result === except) {
        result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    }
    return result;
}

export function localized(str: string, language?: Language) {
    return (Localization[language || 'en'] || Localization['en'])[str];
}

export function newUUID() {
    return UUIDv4();
}
