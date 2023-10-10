import mongoose from 'mongoose';
import IService from '../IService';

const MongoService: IService = {
    start: async function () {
        if (!process.env.DB_URI) throw new Error('env.DB_URI not found.');
        let option: mongoose.ConnectOptions = {};
        if (process.env.DB_USERNAME) {
            option = {
                user: process.env.DB_USERNAME,
                pass: process.env.DB_PASSWORD
            };
        }
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_URI, option);
    },

    stop: async function () {
        await mongoose.disconnect();
    }
};

export default MongoService;
