import http from 'http';
import { Server } from 'socket.io';

import app from './app';
import dotenv from 'dotenv';
import {
  sessionMiddleware,
  sessionWrapper,
} from './config/sessionMiddleware.config';
dotenv.config({ path: '../.env.local' });

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

/**
 ** Creating a http server with the express app.
 **/
const server = http.createServer(app);

/**
 ** Socket io initialization
 **/
const io = new Server(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

io.use(sessionWrapper(sessionMiddleware));

io.on('connect', (socket) => {
  console.log(socket.request);
  console.log('Successfull new connection');
});

server.listen(port, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

export { io };
