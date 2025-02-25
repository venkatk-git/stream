import session from 'express-session';
import MongoStore from 'connect-mongo';
// import { redisClient } from "../redis";
// import { RedisStore } from "connect-redis";

// const store = new RedisStore({
// redisClient,
// });

const sessionMiddleware = session({
  name: 'session_id',
  secret: process.env.COOKIE_SECRET || 'good day',
  resave: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: true, // ✅ Required for cross-site cookies
    sameSite: 'none', // ✅ Needed for cross-origin requests
  },
});

console.log(process.env.APPLICATION_ENVIRONMENT === 'production');

export { sessionMiddleware };
