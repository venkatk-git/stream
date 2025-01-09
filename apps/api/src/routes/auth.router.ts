import { Router } from 'express';
import passport from '../config/passport.config';

import Users from '../models/user.model';

import { ExtendedRequest } from '../lib/types';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { successResponse } from '../lib/utils/response.utils';

const router = Router();

/**
 * Initiates Google OAuth 2.0 authentication.
 *
 * This route redirects the user to Google's OAuth 2.0 authentication page.
 * The `scope` specifies the permissions being requested, including access
 * to the user's profile and email address.
 */
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

/**
 * OAuth 2.0 callback route for Google authentication.
 *
 * This route handles the callback from Google's OAuth 2.0 flow. After successful
 * authentication, the user's details are retrieved from the database and attached
 * to both the request object (`req.user`) and the session (`req.session.user`).
 *
 *  The user is then redirected to the front-end application at
 * `http://localhost:4200/connectSocket`. If the user is not found, the request is
 * redirected back to the Google authentication initiation route (`/auth/google`).
 */
router.get(
  '/google/cb',
  passport.authenticate('google', {
    failureRedirect: '/auth/google',
  }),
  async (req: ExtendedRequest, res) => {
    const user = await Users.findById(req.session.passport.user);

    if (!user) {
      console.error('User not found');
      return res.status(404).redirect('/auth/google');
    }

    req.user = {
      id: user._id.toString(),
      username: user.username,
      googleId: user.googleId,
    };

    req.session.user = req.user;

    // res.redirect('/protected');
    res.redirect('http://localhost:4200/');
  }
);

/**
 *
 */
router.get('/', isAuthenticated(), (req: ExtendedRequest, res) => {
  const user = req.session.user;
  res.status(200).json(successResponse(user));
});

export default router;
