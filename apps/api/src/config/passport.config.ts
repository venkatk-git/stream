import passport, { DoneCallback, Profile } from 'passport';
import GoogleStratergy from 'passport-google-oauth20';
import { InMemorySessionStore } from '../temp/InMemorySessionStore';

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
      const store = new InMemorySessionStore();

      if (store.containsGoogleId(profile.id)) {
        return;
      }

      store.setGoogleId(profile.id);
    }
  )
);

export default passport;
