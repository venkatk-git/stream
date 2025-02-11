"use strict";
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
exports.attachUserToSocket = attachUserToSocket;
const user_model_1 = __importDefault(require("../models/user.model"));
/**
 * Middleware to attach a user object to the socket request.
 *
 * This middleware retrieves the user details from the database using the user ID
 * stored in the session (`socket.request.session.passport.user`). Once the user is
 * found, their details are added to `socket.request.user` with the fields:
 * `id`, `username`, and `googleId`.
 *
 * If the user is not found in the database, it throws an "Unauthorized" error,
 * preventing further execution of the socket connection.
 *
 * @param socket - The extended socket instance that includes session and user details.
 * @param next - The next middleware function in the socket lifecycle.
 */
function attachUserToSocket(socket, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findById(socket.request.session.passport.user);
            if (!user) {
                next(new Error('Unauthorized from socket middleware'));
                return;
            }
            socket.request.session.user = {
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
}
