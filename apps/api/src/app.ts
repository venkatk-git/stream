import express from 'express';
import mongoose from 'mongoose';

import helmet from 'helmet';
import passport from 'passport';

import authRouter from './routes/auth.router';
import testRouter from './routes/test.router';

import { sessionMiddleware } from './middlewares/session.middleware.';

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
 * Adds security-related HTTP headers to the application using helmet.
 *
 * This middleware helps protect the application from common web vulnerabilities
 * by setting various HTTP headers, such as those for content security,
 * cross-site scripting (XSS) protection, and more...
 */
app.use(helmet());

app.use(express.json());

/**
 * Initializes session handling using express-session.
 *
 * This middleware manages the session data for incoming requests, integrating
 * with Passport.js to store user session information and maintain user state
 * across requests.
 */
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
