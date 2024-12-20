import session from 'express-session';
import { RedisStore } from 'connect-redis';
import Redis from 'ioredis';

/**
 * Configures ioredis as a scalable session store.
 *
 * This replaces the default InMemoryStore of express-session with ioredis
 * for storing user session details, providing better scalability and
 * performance in distributed environments.
 */
const redisClient = new Redis();

const sessionMiddleware = session({
  name: 'session_id',
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    httpOnly: true,
    sameSite: 'none',
  },
});

export { sessionMiddleware };
