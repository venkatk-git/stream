import Users from '../models/user.model';

import { RequestHandler, Response, NextFunction } from 'express';
import { ExtendedRequest } from '../lib/types';

export function isAuthenticated(): RequestHandler {
  return (req: ExtendedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.isAuthenticated()) {
      return next(new Error('Not authenticated'));
    }

    return next();
  };
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
