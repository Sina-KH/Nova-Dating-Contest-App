import * as dotenv from 'dotenv';
import * as MongoUnit from 'mongo-unit';
import MongoService from '@/services/mongo/mongoService';

dotenv.config({
    path: '.env_test'
});

export async function prepareNow() {
    const testMongoURI = await MongoUnit.start();
    process.env.DB_URI = testMongoURI + 'test';
    console.log(`Fake MongoDB on: ${testMongoURI}`);
    await MongoService.start();
    console.log('Connect to fake mongoDB!');
}

export async function afterNow() {
    await MongoService.stop();
    console.log('Disconnected from mongoDB!');
    await MongoUnit.stop();
    console.log('Fake mongoDB stopped.');
}
