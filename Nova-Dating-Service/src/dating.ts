import cluster from 'node:cluster';
import { cpus } from 'node:os';

import * as dotenv from 'dotenv';

dotenv.config();

const numCPUs = cpus().length;

if (cluster.isPrimary || cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    if (cluster.worker?.id === numCPUs) console.log('All workers started... :)');
    else if (cluster.worker?.id || 0 > numCPUs) console.log(`Worker ${process.pid} started`);

    const { start } = require('./dating_cluster');
    start().then();
}
