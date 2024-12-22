import { NextFunction } from 'express';
import { ExtendedSocket } from '../lib/types';

/**
 * Middleware to authorize user, by checking if user is present in socket request.
 * If user is not present, then it will throw an error.
 * @param socket
 * @param next
 */
export function authorizeUser(socket: ExtendedSocket, next: NextFunction) {
  if (
    !socket.request.session ||
    !socket.request.session.passport ||
    !socket.request.session.passport.user
  ) {
    console.log('Unauthorized');
    next(new Error('Unauthorized'));
  }

  next();
}
