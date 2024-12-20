import session from 'express-session';
import { RedisStore } from 'connect-redis';
import Redis from 'ioredis';

import { Socket } from 'socket.io';
import { NextFunction } from 'express';
/**
 ** Using ioredis as a scalable alternative to express-session's default
 ** InMemoryStore for storing user session details.
 **/
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

function sessionWrapper(expressMiddleware) {
  return function (socket: Socket, next: NextFunction) {
    expressMiddleware(socket.request, {}, next);
  };
}

export { sessionMiddleware, sessionWrapper };
