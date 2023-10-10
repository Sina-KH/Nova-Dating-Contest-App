import { localized } from '@/helpers/stringHelpers';
import { ipFromRequest } from '@/helpers/requestHelpers';

import { Server, Socket } from 'socket.io';
// redis adapter
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import { IEndConfigAccess } from '@/endpoints/IEnd';
//
import { Exceptions } from '@/helpers/exceptions';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { FastifySchema } from 'fastify/types/schema';
import { IGlobal } from '@/helpers/aliases';
import { Language } from '@/helpers/localization';

import SocketEnds from '@/endpoints/socketEnds';
import { validateTokenLogic } from '@/logic/session/validateTokenLogic';

const ajv = new Ajv();
addFormats(ajv);

// helper function to send error on exception.
function sendError(ack: (res: any) => void, error: Error, language?: Language) {
    if (!ack) return;
    if (error.message?.startsWith('err.'))
        ack({
            key: error.message,
            error: localized(error.message, language)
        });
    else
        ack({
            error: process.env.DEBUG === 'true' ? error.message : 'unknown'
        });
}

async function auth(socket: Socket, loginToken: string) {
    // leave prev room, if socket already authorized
    if (socket.data.userID) {
        socket.leave('u_' + socket.data.userID);
        socket.data.userID = undefined;
    }
    async function authToken() {
        const sessionObj = await validateTokenLogic(loginToken);
        if (!sessionObj) {
            throw new Error(Exceptions.badRequest);
        }
        socket.data = {
            ...socket.data,
            user: sessionObj.userID,
            lang: sessionObj.lang,
            exp: undefined
        };
        socket.join('u_' + sessionObj.userID);
    }
    try {
        await authToken();
    } catch (e) {
        throw new Error(Exceptions.badRequest);
    }
}

const SocketRouter = {
    async start() {
        const io = new Server({
            cors: {
                origin: '*'
            }
        });

        // redis adapter configuration
        const pubClient = createClient({ url: process.env.REDIS_URI });
        const subClient = pubClient.duplicate();

        await Promise.all([pubClient.connect(), subClient.connect()]);
        io.adapter(
            createAdapter(pubClient, subClient, {
                key: process.env.REDIS_ADAPTER_KEY
            })
        );
        //

        (<IGlobal>(<unknown>global)).io = io;

        // middleware to set socket data and auth if header received
        io.use(async (socket, next) => {
            socket.data = {
                ip: ipFromRequest(socket.request)
            };
            try {
                const headers = socket.handshake.headers;
                if (headers.token) await auth(socket, headers.token.toString());
                next();
            } catch (e) {
                next(e instanceof Error ? e : undefined);
            }
        });

        io.on('connection', (socket) => {
            // configure to accept auth request
            socket.on('auth', async (data, ack) => {
                // try to authorize
                const loginToken = data.token?.toString();
                if (!loginToken) return sendError(ack, Error(Exceptions.badRequest));
                try {
                    await auth(socket, loginToken);
                } catch (e) {
                    sendError(ack, e instanceof Error ? e : Error());
                }
                if (ack) ack({});
            });

            // configure to accept endpoint requests
            for (const endpoint of SocketEnds) {
                socket.on(endpoint.url.substring(1), async (data, ack) => {
                    switch (endpoint.configuration.access) {
                        case IEndConfigAccess.logins:
                            if (!socket.data.userID)
                                return sendError(ack, Error(Exceptions.notAuthorized), socket.data?.lang);
                            break;
                        default:
                            return sendError(ack, Error(Exceptions.notAuthorized), socket.data?.lang);
                    }
                    try {
                        // validate inputs
                        const valid = ajv.validate(<FastifySchema>endpoint.schema.body || endpoint.schema.querystring, {
                            ...data
                        });
                        if (!valid) {
                            return sendError(ack, Error(Exceptions.badRequest), socket.data?.lang);
                        }

                        const response = await endpoint.handler(
                            {
                                loginObj: {
                                    userID: socket.data.userID,
                                    lang: socket.data.lang
                                },
                                ip: socket.data.ip
                            },
                            data
                        );
                        if (ack) ack(response.response);
                    } catch (error) {
                        sendError(ack, error instanceof Error ? error : Error(), socket.data?.lang);
                    }
                });
            }
        });
        io.listen(parseInt(process.env.SOCKET_PORT || '10202'));
    }
};

export default SocketRouter;
