import session from 'express-session';
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
    maxAge: 1000 * 60 * 60 * 24 * 60, 
    secure: true,
    sameSite: 'none',
  },
});

export { sessionMiddleware };
