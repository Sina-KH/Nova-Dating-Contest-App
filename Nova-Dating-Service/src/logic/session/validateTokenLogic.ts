import { verifyJWTToken } from '@/helpers/jwtHelpers';

export async function validateTokenLogic(loginToken: string) {
    return verifyJWTToken(loginToken);
}
