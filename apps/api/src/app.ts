import express from 'express';
import helmet from 'helmet';
import session from 'express-session';
import passport from 'passport';

import authRouter from './routes/auth.router';

const app = express();

app.use(helmet());

/*
Session initialization using cookie-session 
 for handling the incomming session from passport
*/
app.use(
  session({
    name: 'sid',
    resave: false,
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Authentication
app.use('/auth', authRouter);

export default app;
