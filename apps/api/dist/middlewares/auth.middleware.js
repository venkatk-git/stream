"use strict";
// import { redisClient } from "../redis";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachUserToRequest = void 0;
exports.isAuthenticated = isAuthenticated;
exports.authorizeUser = authorizeUser;
const user_model_1 = __importDefault(require("../models/user.model"));
function isAuthenticated() {
    return (req, res, next) => {
        var _a, _b;
        if (!req.user ||
            !req.isAuthenticated() ||
            !((_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport) === null || _b === void 0 ? void 0 : _b.user)) {
            return next(new Error("Not authenticated"));
        }
        return next();
    };
}
/**
 * Middleware to authorize a user by verifying the presence of a user in the socket request.
 *
 * This middleware checks if a user session exists in the socket request. If no valid
 * user session is found, it passes an error to the next function in the middleware chain.
 * If a user is authorized, their details are added to the socket object, and
 * the user's socket ID is stored in Redis.
 *
 * @param socket - The connected socket instance, extended with session data.
 * @param next - Callback to pass control to the next middleware or function.
 */
function authorizeUser(socket, next) {
    if (!socket.request.session ||
        !socket.request.session.passport ||
        !socket.request.session.passport.user) {
        return next(new Error("User not authorized"));
    }
    socket.user = Object.assign({}, socket.request.session.user);
    // redisClient.hSet(`userid:${socket.user.id}`, "socketid", socket.id);
    return next();
}
/**
 * Middleware to attach a user object to the Express request.
 *
 * This middleware retrieves the user details from the database using the user ID
 * stored in the session (`req.session.passport.user`). Once the user is
 * found, their details are added to `req.user`.
 *
 * If the user is not found in the database, it throws a 401 Unauthorized error,
 * preventing further execution of the request.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the request lifecycle.
 */
const attachUserToRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.passport) === null || _b === void 0 ? void 0 : _b.user;
        if (!userId)
            return next(new Error("User is not authenticated"));
        const user = yield user_model_1.default.findById(userId);
        if (!user)
            return next(new Error("User not found"));
        req.user = {
            id: user._id.toString(),
            username: user.username,
            googleId: user.googleId,
            profileImg: user.profileImg,
        };
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.attachUserToRequest = attachUserToRequest;
