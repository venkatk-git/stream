import http from 'http';
import { Server } from 'socket.io';

import app from './app';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });

import { attachUserToSocket } from './middlewares/socket.middleware';
import { sessionMiddleware } from './middlewares/session.middleware.';

import { ExtendedSocket } from './lib/types';
import { authorizeUser } from './controllers/auth.controller';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

/**
 * Creates an HTTP server using the Express app.
 *
 * This server will handle incoming HTTP requests and pass them to the Express
 * application (`app`) for routing and processing.
 */
const server = http.createServer(app);

/**
 * Initializes a new instance of Socket.io server.
 *
 * This sets up the Socket.io server to listen on the provided HTTP server
 * (`server`) and configures the CORS (Cross-Origin Resource Sharing) settings
 * to allow connections from `process.env.CLIENT_ORIGIN` with credentials (cookies, etc.).
 */
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  },
});

/**
 * Assigning session middleware to socket.io engine
 * This middleware ensures that session data is available for each incoming socket connection.
 */
io.engine.use(sessionMiddleware);

/**
 * Assigning user attachment middleware to socket.io
 * This middleware populates the socket with the authenticated user data, making it available
 * for further socket operations.
 */
io.use(attachUserToSocket);

/**
 * Assigning user authorization middleware to socket.io
 * This middleware ensures that the user is authenticated before establishing a socket connection.
 */
io.use(authorizeUser);

/**
 * Handles new socket connections.
 *
 * This event listener is triggered when a new socket connection is established.
 * It logs the session ID from the socket's request object and confirms the successful
 * connection with a message in the console.
 *
 * @param socket - The connected socket, extended with session data and user details.
 */
io.on('connect', (socket: ExtendedSocket) => {
  console.log('New Socket Connection: ', socket.request.user);
});

server.listen(port, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
