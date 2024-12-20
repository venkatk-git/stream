import http from 'http';
import { Server } from 'socket.io';

import app from './app';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });

import { attachUserToSocket } from './middlewares/socket.middleware';
import { sessionMiddleware } from './middlewares/session.middleware.';

import { ExtendedSocket } from './lib/types';

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
    origin: 'http://localhost:4200',
    credentials: true,
  },
});

/**
 ** Assigning socket.io middlewares
 **/
io.engine.use(sessionMiddleware);
io.use(attachUserToSocket);

io.on('connect', (socket: ExtendedSocket) => {
  console.log(socket.request.sessionID);

  console.log('Successfull new connection');
});

server.listen(port, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
