import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { redisClient } from '../redis';

/**
 * Configures a scalable session store using ioredis and connect-redis.
 *
 * This setup replaces the default InMemoryStore of express-session with Redis
 * for managing session data. Using Redis improves scalability and performance,
 * particularly in distributed environments where session data must be shared
 * across multiple instances of the application.
 */

/**
 * Express session middleware configuration.
 */
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
    sameSite: 'lax',
  },
});

export { sessionMiddleware };
