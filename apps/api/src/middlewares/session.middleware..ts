import session from 'express-session';
import process from 'process';
// import { redisClient } from "../redis";
// import { RedisStore } from "connect-redis";

// const store = new RedisStore({
// redisClient,
// });

const sessionMiddleware = session({
  name: 'session_id',
  secret: process.env.COOKIE_SECRET || 'good day',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure:
      process.env.APPLICATION_ENVIRONMENT === 'PRODUCTION' ? true : 'auto',
    httpOnly: true,
    sameSite: 'lax',
    domain: process.env.CLIENT_ORIGIN,
  },
});

export { sessionMiddleware };
