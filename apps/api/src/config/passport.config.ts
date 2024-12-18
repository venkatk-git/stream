import passport, { DoneCallback, Profile } from 'passport';
import GoogleStratergy from 'passport-google-oauth20';

import { User } from '../lib/types';

import Users from '../models/user.model';

// Serialization & Deserialization
passport.serializeUser((user: User, done: DoneCallback) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId: string, done: DoneCallback) => {
  done(null, await Users.findById(userId));
});

// Passport Middleware
passport.use(
  new GoogleStratergy(
    {
      //options for google stat
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/cb',
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: DoneCallback
    ) => {  
      // passport cb function
      const user = await Users.findOne({ googleId: profile.id });
      
      if (user) {
        console.log('Existing User: ', user);
        done(null, user);
        return;
      }

      const newUser = new Users({
        username: profile.displayName,
        googleId: profile.id,
      });

      await newUser.save();

      done(null, newUser);
      console.log('New User: ', newUser);
    }
  )
);

export default passport;
