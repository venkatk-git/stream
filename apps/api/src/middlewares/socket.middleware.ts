import Users from '../models/user.model';

import { NextFunction } from 'express';
import { ExtendedSocket } from '../lib/types';

/**
 * Middleware to attach a user object to the socket request.
 *
 * This middleware retrieves the user details from the database using the user ID
 * stored in the session (socket.request.session.passport.user). It then sets the
 * user object in `socket.request.user` with the fields: `username` and `googleId`.
 *
 * If the user is not found in the database, it throws an "Unauthorized" error.
 *
 * @param socket - The socket instance, extended with session and user details.
 * @param next - The next middleware function to be called.
 */
export async function attachUserToSocket(
  socket: ExtendedSocket,
  next: NextFunction
) {
  const user = await Users.findById(socket.request.session.passport.user);

  if (!user) {
    throw new Error('Unauthorized from socket middleware');
  }

  socket.request.user = {
    username: user.username,
    googleId: user.googleId,
  };

  next();
}
