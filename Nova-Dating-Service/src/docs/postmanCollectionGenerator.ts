import { afterNow, prepareNow } from '@test/prepareHelpers.spec';
import Ends from '@/endpoints/ends';
import { IEndConfigAccess, IEndHead, IEndMethod } from '@/endpoints/IEnd';
import { HTTPStatusCodes } from './constants';
import fs from 'fs';
import MongoUnit from 'mongo-unit';
import testData from '@test/testData.spec';
import TestDataSpec from '@test/testData.spec';
import { integerEnumDocumentation } from '@/helpers/enumHelpers';
import path from 'path';
import { Language } from '@/helpers/localization';

export async function generatePostmanCollection(): Promise<{
    status: boolean;
    result?: any;
}> {
    await prepareNow();
    let collection;
    try {
        collection = {
            info: {
                name: process.env.DOCS_TITLE,
                _postman_id: process.env.POSTMAN_COLLECTION_POSTMAN_ID,
                schema: 'https://schema.getpostman.com/json/collection/v2.0.0/collection.json'
            },
            item: []
        };

        for (const end of Ends) {
            const path = end.url.split('/');
            let relativePathItemObj: any[] = collection.item;
            // create path in postman collection
            for (let i = 1; i < path.length - 1; i++) {
                const pathItem = path[i].charAt(0).toUpperCase() + path[i].slice(1);
                const foundItem = relativePathItemObj.find((it) => it.name === pathItem && it.item);
                if (!foundItem) {
                    const newIt = {
                        name: pathItem,
                        item: []
                    };
                    relativePathItemObj.push(newIt);
                    relativePathItemObj = newIt.item;
                } else {
                    relativePathItemObj = foundItem.item;
                }
            }

            // create headers array, for now, it always contains `session token` and `user token` values
            const headers = [
                {
                    key: 'lang',
                    value: '{{language}}',
                    type: 'text'
                }
            ];
            switch (end.configuration.access) {
                case IEndConfigAccess.logins:
                case IEndConfigAccess.systemRoles:
                    headers.push({
                        key: 'token',
                        value: '{{token}}',
                        type: 'text'
                    });
                    break;
                case IEndConfigAccess.public:
                    break;
            }
            // create request body / query params
            const requestBody =
                end.method === IEndMethod.POST
                    ? {
                          mode: 'raw',
                          raw: JSON.stringify(end.docs.sampleInput, null, 4),
                          options: {
                              raw: {
                                  language: 'json'
                              }
                          }
                      }
                    : undefined;

            function createQueryFrom(sampleInput: any) {
                const arr = [];
                for (let key of Object.keys(sampleInput)) {
                    arr.push({
                        key: key,
                        value: (sampleInput[key] || '').toString()
                    });
                }
                return arr;
            }

            const requestQuery = end.method === IEndMethod.GET ? createQueryFrom(end.docs.sampleInput) : undefined;

            // create request url
            const requestURL = {
                raw: '{{url}}/' + end.url,
                host: ['{{url}}'],
                path: end.url.split('?')[0].split('/'),
                query: requestQuery
            };

            // create sample responses
            await MongoUnit.load(testData);
            const loginObjUser = {
                userID: TestDataSpec.users[0]._id,
                lang: Language.en
            };
            let endHeaders: IEndHead = {
                ip: '-'
            };
            switch (end.configuration.access) {
                case IEndConfigAccess.public:
                    break;
                case IEndConfigAccess.logins:
                case IEndConfigAccess.systemRoles:
                    endHeaders = {
                        ...endHeaders,
                        loginObj: loginObjUser
                    };
                    break;
            }
            console.log('working on: ' + end.url);
            const response = await end.handler(
                endHeaders,
                // @ts-ignore
                end.docs.sampleInput
            );
            await MongoUnit.drop();
            const sampleResponses = [
                {
                    name: end.docs.name + ' => Sample Response',
                    originalRequest: {
                        method: end.method,
                        header: headers,
                        body: requestBody,
                        url: requestURL
                    },
                    // @ts-ignore
                    status: HTTPStatusCodes[response.statusCode],
                    code: response.statusCode,
                    _postman_previewlanguage: 'json',
                    header: [],
                    cookie: [],
                    body: JSON.stringify(response.response, null, 4)
                }
            ];

            let enumsDocumentation = '';
            if (end.docs.enums) {
                enumsDocumentation += '\n';
                for (const key of Object.keys(end.docs.enums))
                    enumsDocumentation += integerEnumDocumentation(key, end.docs.enums[key]);
            }

            // create request object
            const endRequest = {
                name: end.docs.name.charAt(0).toUpperCase() + end.docs.name.slice(1),
                request: {
                    method: end.method,
                    header: headers,
                    body: requestBody,
                    url: requestURL,
                    description: end.docs.description + enumsDocumentation
                },
                response: sampleResponses
            };
            relativePathItemObj.push(endRequest);
        }
        console.log(__dirname);
        await fs.promises.writeFile(
            path.join(process.env.DOCS_TITLE + '.postman_collection.json'),
            JSON.stringify(collection)
        );
    } catch (e) {
        console.log(e);
        return { status: false };
    }
    await afterNow();
    return { status: true, result: collection };
}
