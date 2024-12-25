import { redisClient } from '../redis';

import { NextFunction } from 'express';
import { ExtendedSocket } from '../lib/types';

/**
 * Middleware to authorize a user by verifying the presence of a user in the socket request.
 *
 * This middleware checks if a user session exists in the socket request. If no valid 
 * user session is found, it passes an error to the next function in the middleware chain. 
 * If a user is authorized, their details are added to the socket object, and
 * the user's socket ID is stored in Redis.
 *
 * @param socket - The connected socket instance, extended with session data.
 * @param next - Callback to pass control to the next middleware or function.
 */
export function authorizeUser(socket: ExtendedSocket, next: NextFunction) {
  if (!socket.request.session || !socket.request.session.user) {
    console.log('Unauthorized');
    return next(new Error('Unauthorized'));
  }

  socket.user = { ...socket.request.session.user };
  redisClient.hset(`userid:${socket.user.id}`, 'socketid', socket.id);
  next();
}
