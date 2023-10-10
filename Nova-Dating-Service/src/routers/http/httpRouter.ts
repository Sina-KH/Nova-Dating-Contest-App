import { IEndConfigAccess, IEndHead, IEndMethod } from '@/endpoints/IEnd';
import Ends from '@/endpoints/ends';
import { localized } from '@/helpers/stringHelpers';

import Fastify, { FastifyReply, FastifyRequest } from 'fastify';

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { Language } from '@/helpers/localization';

import { IFileResponse } from '@/helpers/aliases';
import { Exceptions } from '@/helpers/exceptions';
import { FastifySchema } from 'fastify/types/schema';
import { ipFromRequest } from '@/helpers/requestHelpers';
import { validateTokenLogic } from '@/logic/session/validateTokenLogic';
import UserRepo from '@/repos/userRepo';
import { IUserProps, IUserRole, IUserStatus } from '@/models/user';
import path from 'path';

const ajv = new Ajv({ allErrors: true, coerceTypes: true });
addFormats(ajv);

const fastify = Fastify({
    logger: process.env.DEBUG === 'true'
});

fastify.register(import('@fastify/cors'), {});
fastify.register(import('@fastify/formbody'), {});
fastify.register(import('fastify-file-upload'), {});

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, '..', '..', '..', 'public'),
    prefix: '/'
});

function responseError(request: FastifyRequest, reply: FastifyReply, error: Error, additionalInfo?: any) {
    const errorKey = error.message;
    if (errorKey?.startsWith('err.'))
        reply.code(400).send({
            key: errorKey,
            message: localized(errorKey, <Language>request.headers?.lang),
            additionalInfo
        });
    else if (errorKey?.startsWith('msg.')) {
        reply.code(400).send({
            message: errorKey.substring(4),
            additionalInfo
        });
    } else
        reply.code(500).send({
            message: process.env.DEBUG === 'true' ? errorKey : 'unknown',
            additionalInfo
        });
}

const httpRouter = {
    async start() {
        for (const endpoint of Ends) {
            const preHandler = async (request: any, reply: any) => {
                const input =
                    endpoint.method === IEndMethod.POST
                        ? request.body
                        : {
                              ...request.params,
                              ...request.query
                          };

                // validate inputs
                const validate = ajv.compile(<FastifySchema>endpoint.schema.body || endpoint.schema.querystring);
                const valid = validate({ ...input });
                if (!valid) {
                    console.log(validate.errors);
                    return responseError(
                        request,
                        reply,
                        Error(Exceptions.badRequest),
                        process.env.DEBUG === 'true' ? validate.errors : undefined
                    );
                }

                try {
                    // check access control
                    if (endpoint.configuration?.access === IEndConfigAccess.public) return; // grant access
                    else if (endpoint.configuration.access === IEndConfigAccess.logins) {
                        const sessionObj = await validateTokenLogic(request.headers.token?.toString());
                        if (!sessionObj?.userID) return reply.code(403).send('Access Error!');
                        request.loginObj = {
                            userID: sessionObj?.userID
                        };
                        return; // grant access
                    } else if (endpoint.configuration.access === IEndConfigAccess.systemRoles) {
                        const sessionObj = await validateTokenLogic(request.headers.token?.toString());
                        if (!sessionObj?.userID) return reply.code(403).send('Access Error!');
                        let user = await UserRepo.findByID(sessionObj.userID, IUserProps.system);
                        if (user?.status !== IUserStatus.active) return reply.code(403).send('Access Error!');
                        request.loginObj = {
                            userID: user._id
                        };
                        const userRoles = user?.roles || [];
                        if (userRoles.map((it) => it.toString()).indexOf(IUserRole.superAdmin) > -1) return; // grant access to superAdmin
                        // check for access
                        for (const role of userRoles) {
                            if ((endpoint.configuration.systemRoles || []).indexOf(role) > -1) return; // access granted!
                        }
                        return reply.code(403).send('Access Error!');
                    }
                    // no access
                    return reply.code(403).send('Access Error!');
                } catch (error) {
                    return responseError(request, reply, error instanceof Error ? error : Error());
                }
            };
            fastify.route({
                method: endpoint.method,
                url: endpoint.url,
                //schema: endpoint.schema, // we validate inputs on handler

                preHandler: preHandler,
                handler: async (request: any, reply: any) => {
                    const input =
                        endpoint.method === IEndMethod.POST
                            ? request.body
                            : {
                                  ...request.params,
                                  ...request.query
                              };

                    const headers: IEndHead = {
                        loginObj: request.loginObj,
                        allHeaders: request.headers,
                        ip: ipFromRequest(request)
                    };
                    try {
                        const response = await endpoint.handler(headers, input || {});
                        if (response.statusCode === 298) {
                            return reply.redirect(<string>(<unknown>response.response));
                        }
                        if (response.statusCode === 299) {
                            // 299 is media return type
                            const mediaResponse = <IFileResponse>(<unknown>response.response);
                            return reply.code(200).type(mediaResponse.mimeType).send(mediaResponse.media);
                        }
                        return reply.code(response.statusCode).send(response.response);
                    } catch (error: any) {
                        return responseError(request, reply, error);
                    }
                }
            });
        }
        try {
            await fastify.listen({
                host: '0.0.0.0',
                port: parseInt(process.env.HTTP_PORT || '15190')
            });
        } catch (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    }
};

export default httpRouter;
