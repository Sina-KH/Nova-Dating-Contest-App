import { afterNow, prepareNow } from './prepareHelpers.spec';

import prepare from 'mocha-prepare';

prepare(
    async (done: any) => {
        await prepareNow();
        done();
    },
    async (done: any) => {
        await afterNow();
        done();
    }
);
