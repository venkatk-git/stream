import Users from '../models/user.model';

import { NextFunction } from 'express';
import { ExtendedSocket } from '../lib/types';

/**
 * Middleware to attach a user object to the socket request.
 *
 * This middleware retrieves the user details from the database using the user ID
 * stored in the session (`socket.request.session.passport.user`). Once the user is
 * found, their details are added to `socket.request.user` with the fields:
 * `id`, `username`, and `googleId`.
 *
 * If the user is not found in the database, it throws an "Unauthorized" error,
 * preventing further execution of the socket connection.
 *
 * @param socket - The extended socket instance that includes session and user details.
 * @param next - The next middleware function in the socket lifecycle.
 */

export async function attachUserToSocket(
  socket: ExtendedSocket,
  next: NextFunction
) {
  const user = await Users.findById(socket.request.session.passport.user);

  if (!user) {
    next('Unauthorized from socket middleware');
    return;
  }

  socket.request.session.user = {
    id: user._id.toString(),
    username: user.username,
    googleId: user.googleId,
  };

  next();
}
