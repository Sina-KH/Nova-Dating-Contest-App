import Crypto from 'crypto';

export function newToken() {
    return new Date().getTime() + '_' + Crypto.randomBytes(32).toString('base64');
}
