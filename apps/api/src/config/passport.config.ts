import passport, { DoneCallback, Profile } from 'passport';
import GoogleStratergy from 'passport-google-oauth20';

import Users from '../models/user.model';

/**
 * Serializes the user ID into the session.
 *
 * This method takes the user's ID and stores it in the session to maintain
 * a logged-in state across requests.
 *
 * @param userId - The ID of the authenticated user.
 * @param done - The callback to signal the completion of serialization.
 */
passport.serializeUser((userId: string, done: DoneCallback) => {
  done(null, userId);
});

/**
 * Deserializes the user ID from the session.
 *
 * This method retrieves the user ID from the session and attaches it to
 * `req.user` for use in the application.
 *
 * @param userId - The ID of the user retrieved from the session.
 * @param done - The callback to signal the completion of deserialization.
 */
passport.deserializeUser((userId: string, done: DoneCallback) => {
  done(null, userId);
});

/**
 * Configures Passport to use Google OAuth 2.0 strategy.
 *
 * This middleware handles the OAuth 2.0 authentication flow with Google. It includes,
 * - Sending the user to Google's OAuth 2.0 authentication page.
 * - Handling the callback after authentication with Google's servers.
 * - Finding or creating a user in the database based on their Google profile.
 */
passport.use(
  new GoogleStratergy(
    {
      // Google OAuth 2.0 options
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    /**
     *
     * It either finds the user in the database by their Google ID (or) creates a
     * new user if none exists.
     *
     * @param accessToken - The access token provided by Google.
     * @param refreshToken - The refresh token provided by Google (unused here).
     * @param profile - The authenticated user's profile information from Google.
     * @param done - The callback to signal the completion of authentication.
     */
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: DoneCallback
    ) => {
      // Check if a user with the given Google ID already exists in the database
      const user = await Users.findOne({ googleId: profile.id });

      // If user exists, complete authentication by passing the user ID
      if (user) {
        done(null, user._id.toString());
        return;
      }

      // If user does not exist, create a new user in the database
      const newUser = await new Users({
        username: profile.displayName,
        googleId: profile.id,
        profileImg: profile.photos[0].value,
      }).save();

      const serializeUserPayload = newUser._id.toString();

      done(null, serializeUserPayload);
    }
  )
);

export default passport;
