import { Router } from 'express';

import passport from '../config/passport.config';

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
 * This route handles the callback from Google's OAuth 2.0 flow. If authentication
 * is successful, it redirects the user to the front-end application at
 * `http://localhost:4200/connectSocket`. In case of failure, the user is
 * redirected to the Google authentication initiation route (`/auth/google`).
 */
router.get(
  '/google/cb',
  passport.authenticate('google', {
    failureRedirect: '/auth/google',
  }),
  (req, res) => {
    res.redirect('http://localhost:4200/connectSocket');
  }
);

export default router;
