import http from 'http';
import { Server } from 'socket.io';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });

import { authorizeUser } from './middlewares/auth.middleware';
import { attachUserToSocket } from './middlewares/socket.middleware';
import { sessionMiddleware } from './middlewares/session.middleware.';

import { joinHandler, membersList } from './socket/handlers/room.handler';
import { loadVideoHandler } from './socket/handlers/video.handler';

import { ExtendedSocket } from './lib/types';

import app from './app';
import { addVideoToQueue } from './services/room.service';

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
 * Adds security-related HTTP headers to the application using helmet.
 *
 * This middleware helps protect the application from common web vulnerabilities
 * by setting various HTTP headers, such as those for content security,
 * cross-site scripting (XSS) protection, and more...
 *
 * Purpose:
 * - Enhances the security of the application by setting various HTTP headers.
 */
io.engine.use(helmet());

/**
 * Assigning session middleware to socket.io engine
 *
 * Purpose:
 * - This middleware ensures that session data is available for each incoming socket connection.
 */
io.engine.use(sessionMiddleware);

/**
 * Purpose:
 * - This middleware ensures that the user is authenticated before establishing a socket connection.
 */
io.use(authorizeUser);

/**
 * Purpose:
 * - This middleware populates the socket with the authenticated user data, making it available
 * for further socket operations.
 */
io.use(attachUserToSocket);

/**
 * Handles new socket connections.
 *
 * Triggered when a client establishes a socket connection. This function sets up
 * event listeners for the connected socket and provides confirmation of the
 * successful connection in the console.
 *
 * @param socket - The connected socket instance.
 */
io.on('connect', (socket: ExtendedSocket) => {
  console.log(`[socket] ${socket.user.username} has connected`);

  io.emit('user:connected', {
    message: `${socket.user.username} has connected`,
  });

  socket.on('room:join', async ({ roomId }: { roomId: string }) => {
    const isJoined = await joinHandler(socket, roomId);

    if (isJoined) io.emit('room:joined', { name: socket.user.username });

    // Send Member list on join
    const memberList = await membersList(socket);
    io.to(roomId).emit('room:members_list', memberList);

    // Load initial video on join
    const videoId = await loadVideoHandler(socket);
    if (videoId)
      socket.emit('video:load', {
        videoId: videoId.id,
        title: videoId.title,
      });
  });

  /**
   * Video State Changes
   */
  socket.on('video:play', () => {
    io.to(socket.request.session.roomId).emit(
      'video:play',
      socket.user.username
    );
  });
  socket.on('video:pause', () => {
    io.to(socket.request.session.roomId).emit(
      'video:pause',
      socket.user.username
    );
  });
  socket.on('video:seek', (seekTo: number) => {
    io.to(socket.request.session.roomId).emit('video:seek', seekTo);
  });

  /**
   * Video Queue
   */
  socket.on('video_queue:add', async (videoId: string) => {
    const videoQueue = await addVideoToQueue(
      socket.request.session.roomId,
      videoId
    );

    socket.emit('video_queue:update', videoQueue);
  });

  socket.on('disconnect', () => {
    io.emit('user:disconnected', {
      message: `${socket.user.username} has disconnected`,
    });
  });
});

server.listen(port, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

// socket.on('video:play', (payload) =>
//   videoEventHandler(socket, 'video:play', payload)
// );
// socket.on('video:pause', (payload) =>
//   videoEventHandler(socket, 'video:play', payload)
// );
// socket.on('video:seek', (payload) =>
//   videoEventHandler(socket, 'video:play', payload)
// );
