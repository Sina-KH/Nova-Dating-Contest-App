import MongoService from '@/services/mongo/mongoService';
import HTTPRouter from '@/routers/http/httpRouter';
import SocketRouter from '@/routers/socket/socketRouter';

export async function start() {
    try {
        await MongoService.start();

        HTTPRouter.start().then();
        SocketRouter.start().then();
    } catch (e) {
        console.log('FAILED TO START', e);
        process.exit(1);
    }
}
