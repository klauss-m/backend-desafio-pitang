import express from 'express';
import cors from 'cors';

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(cors());

export { server };
