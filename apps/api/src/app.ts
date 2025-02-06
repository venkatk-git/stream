import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import cors from 'cors';
import helmet from 'helmet';

import authRouter from './routes/auth.router';
import testRouter from './routes/test.router';
import roomRouter from './routes/room.router';

import { globalErrorHandler } from './controllers/error.controller';

import { sessionMiddleware } from './middlewares/session.middleware.';
import {
  attachUserToRequest,
  isAuthenticated,
} from './middlewares/auth.middleware';

import AppError from './lib/utils/AppError';

import { ExtendedRequest } from './lib/types';
import { Response, NextFunction } from 'express';
import { successResponse } from './lib/utils/response.utils';

const app = express();

// CORS
const allowedOrigins = ['http://localhost:4200']; // Add allowed origins here

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, origin);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies and credentials
  })
);

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
 *
 * Purpose:
 * - Enhances the security of the application by setting various HTTP headers.
 */
app.use(helmet());

app.use(express.json());

/**
 * Initializes session handling using express-session.
 *
 * This middleware manages the session data for incoming requests, integrating
 * with Passport.js to store user session information and maintain user state
 * across requests.
 *
 * Purpose:
 * - Manages session data for incoming requests, integrating with Passport.js
 */
app.use(sessionMiddleware);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Authentication
app.use('/auth', authRouter);

/**
 * Middleware to attach the authenticated user to the request object.
 * This ensures that user details are available in `req.user` for all subsequent routes and middleware.
 *
 * Purpose:
 * - Attaches the authenticated user to the request object for easy access in subsequent middleware and routes.
 */
app.use(attachUserToRequest);

app.get('/reqAuth', isAuthenticated(), (req: ExtendedRequest, res) => {
  const user = req.user;

  res.status(200).json(successResponse(user));
});

app.get('/', (req, res) => {
  res.send('Home');
});

app.use('/', testRouter);

app.use('/r', roomRouter);

app.all('*', (req: ExtendedRequest, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

/**
 * Global Error Handling Middleware
 * Attached at the end of the middleware stack.
 *
 * Purpose:
 * - Ensures consistent error responses across the application.
 * - Handles both operational and unexpected errors.
 */
app.use(globalErrorHandler);

export default app;
