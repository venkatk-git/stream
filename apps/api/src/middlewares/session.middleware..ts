import session from 'express-session';
// import { redisClient } from "../redis";
// import { RedisStore } from "connect-redis";

// const store = new RedisStore({
// redisClient,
// });

const sessionMiddleware = session({
  name: 'session_id',
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET || 'good day',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: false,
    httpOnly: true,
    sameSite: 'none',
  },
});

export { sessionMiddleware };
