"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = void 0;
const express_session_1 = __importDefault(require("express-session"));
// import { redisClient } from "../redis";
// import { RedisStore } from "connect-redis";
// const store = new RedisStore({
// redisClient,
// });
const sessionMiddleware = (0, express_session_1.default)({
    name: "session_id",
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET || "good day",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: false,
        httpOnly: true,
        sameSite: "lax",
    },
});
exports.sessionMiddleware = sessionMiddleware;
