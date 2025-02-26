import session from 'express-session';
import { redisClient } from '../redis';
const RedisStore = require('connect-redis')(session)

const sessionMiddleware = session({
  name: 'session_id',
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET || 'good day',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
  },
});

export { sessionMiddleware };
