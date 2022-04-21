import express from 'express';
import cors from 'cors';

import { healthcheckRouter } from './routes/healthcheck.routes';
import { appointmentRouter } from './routes/appointment.routes';
import { errorHandler } from './middleware/error-handler';

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(errorHandler);

server.use(cors());
server.use('/healthcheck', healthcheckRouter);
server.use('/appointments', appointmentRouter);

export { server };
