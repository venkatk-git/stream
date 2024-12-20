import express from 'express';
import mongoose from 'mongoose';

import helmet from 'helmet';
import passport from 'passport';

import authRouter from './routes/auth.router';
import testRouter from './routes/test.router';

import { sessionMiddleware } from './config/sessionMiddleware.config';

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

app.use(express.json());

/**
 ** Session initialization using express-session
 ** for handling the incoming session data from Passport.
 **/
app.use(sessionMiddleware);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Authentication
app.use('/auth', authRouter);



app.get('/', (req, res) => {
  res.send('Home');
});

app.use('/', testRouter);

export default app;
