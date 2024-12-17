import express from 'express';
import mongoose from 'mongoose';

import helmet from 'helmet';
import session from 'express-session';
import passport from 'passport';

import authRouter from './routes/auth.router';

const app = express();

// Connect to Mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('DB CONNECTED');
  })
  .catch((e: Error) => {
    console.error(e.message);
  });

/**
 ** helmet() is a middleware to enhance the of the application security by
 ** setting various HTTP headers to protect against common vulnerabilities.
 **/
app.use(helmet());

/**
 ** Session initialization using express-session
 ** for handling the incoming session data from Passport.
 **/
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
