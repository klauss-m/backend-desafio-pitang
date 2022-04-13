import express from 'express';
import cors from 'cors';

import { healthcheckRouter } from './routes/healthcheck.routes';

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(cors());
server.use('/healthcheck', healthcheckRouter);

export { server };
