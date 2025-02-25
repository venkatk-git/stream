// import { redisClient } from "../redis";

import Users from '../models/user.model';

import { RequestHandler, Response, NextFunction } from 'express';
import { ExtendedRequest, ExtendedSocket } from '../lib/types';

export function isAuthenticated(): RequestHandler {
  console.log('isAuth()');
  return (req: ExtendedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.isAuthenticated() || !req.session?.passport?.user) {
      return next(new Error('Not authenticated'));
    }

    return next();
  };
}

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
  if (
    !socket.request.session ||
    !socket.request.session.passport ||
    !socket.request.session.passport.user
  ) {
    console.log(socket.request.session);

    return next(new Error('User not authorized'));
  }

  socket.user = { ...socket.request.session.user };
  // redisClient.hSet(`userid:${socket.user.id}`, "socketid", socket.id);
  return next();
}

/**
 * Middleware to attach a user object to the Express request.
 *
 * This middleware retrieves the user details from the database using the user ID
 * stored in the session (`req.session.passport.user`). Once the user is
 * found, their details are added to `req.user`.
 *
 * If the user is not found in the database, it throws a 401 Unauthorized error,
 * preventing further execution of the request.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the request lifecycle.
 */
export const attachUserToRequest = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.session?.passport?.user;
    if (!userId) {
      console.log('here the bug');
      return next(new Error('User is not authenticated'));
    }
    const user = await Users.findById(userId);
    if (!user) return next(new Error('User not found'));

    req.user = {
      id: user._id.toString(),
      username: user.username,
      googleId: user.googleId,
      profileImg: user.profileImg,
    };

    next();
  } catch (error) {
    next(error);
  }
};
