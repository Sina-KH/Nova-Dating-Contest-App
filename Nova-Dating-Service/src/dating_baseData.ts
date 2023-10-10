import MongoService from '@/services/mongo/mongoService';
import TagRepo from '@/repos/tagRepo';
import { baseTags } from '@/baseData/baseTags';
import * as dotenv from 'dotenv';

dotenv.config();

async function start() {
    try {
        await MongoService.start();

        // create base tags
        for (const tag of baseTags) {
            await TagRepo.upsert(tag);
        }

        console.log('Base data created successfully!');
        process.exit(0);
    } catch (e) {
        console.log('FAILED TO START', e);
        process.exit(1);
    }
}

start().then();
