import passport, { DoneCallback, Profile } from 'passport';
import GoogleStratergy from 'passport-google-oauth20';

import { InMemorySessionStore } from '../temp/InMemorySessionStore';
const store = new InMemorySessionStore();

// Serialization & Deserialization
passport.serializeUser((userId: string, done: DoneCallback) => {
  done(null, userId);
});

passport.deserializeUser((userId: string, done: DoneCallback) => {
  done(null, store.getGoogleId(userId));
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
    (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: DoneCallback
    ) => {
      // passport cb function
        if (store.containsGoogleId(profile.id)) {
        console.log('Existing User: ', store.getUser(profile.id));
        done(null, store.getUser(profile.id));
        return;
      }

      store.setGoogleId(profile.id);
      done(null, store.getUser(profile.id));
      console.log('New User: ', store.getUser(profile.id));
    }
  )
);

export default passport;
