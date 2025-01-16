import { redisClient } from '../redis';

import Users from '../models/user.model';

import { RequestHandler, Response, NextFunction } from 'express';
import { ExtendedRequest, ExtendedSocket } from '../lib/types';
import console from 'console';

export function isAuthenticated(): RequestHandler {
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
    return next(new Error('User not authorized'));
  }

  socket.user = { ...socket.request.session.user };
  redisClient.hset(`userid:${socket.user.id}`, 'socketid', socket.id);
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
export async function attachUserToRequest(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // Retrieve the user ID from the session
    const userId = req.session?.passport?.user;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { message: 'User is not authenticated' },
      });
    }

    // Fetch the user from the database
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: { message: 'User not found' },
      });
    }

    // Attach the user to the request object
    req.user = {
      id: user._id.toString(),
      username: user.username,
      googleId: user.googleId,
      profileImg: user.profileImg,
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error attaching user to request:', error);

    res.status(500).json({
      success: false,
      error: { message: 'Internal Server Error' },
    });
  }
}
