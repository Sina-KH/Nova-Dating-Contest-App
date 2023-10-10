import { FastifyRequest } from 'fastify';
import { IncomingMessage } from 'http';

export function ipFromRequest(request: FastifyRequest | IncomingMessage): string {
    return <string>(
        (request.headers['cf-connecting-ip'] || request.headers['x-forwarded-for'] || request.connection.remoteAddress)
    );
}
