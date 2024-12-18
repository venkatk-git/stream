import express from 'express';
import mongoose from 'mongoose';
import Redis from 'ioredis';
import { RedisStore } from 'connect-redis';

import helmet from 'helmet';
import session from 'express-session';
import passport from 'passport';

import authRouter from './routes/auth.router';
import testRouter from './routes/test.router';

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
 ** Using ioredis as a scalable alternative to express-session's default
 ** InMemoryStore for storing user session details.
 **/
const redisClient = new Redis();

/**
 ** Session initialization using express-session
 ** for handling the incoming session data from Passport.
 **/
app.use(
  session({
    name: 'session_id',
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      httpOnly: true,
    },
  })
);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Authentication
app.use('/auth', authRouter);

app.use('/', testRouter);

export default app;
