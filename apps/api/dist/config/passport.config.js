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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const user_model_1 = __importDefault(require("../models/user.model"));
/**
 * Serializes the user ID into the session.
 *
 * This method takes the user's ID and stores it in the session to maintain
 * a logged-in state across requests.
 *
 * @param userId - The ID of the authenticated user.
 * @param done - The callback to signal the completion of serialization.
 */
passport_1.default.serializeUser((userId, done) => {
    done(null, userId);
});
/**
 * Deserializes the user ID from the session.
 *
 * This method retrieves the user ID from the session and attaches it to
 * `req.user` for use in the application.
 *
 * @param userId - The ID of the user retrieved from the session.
 * @param done - The callback to signal the completion of deserialization.
 */
passport_1.default.deserializeUser((userId, done) => {
    done(null, userId);
});
/**
 * Configures Passport to use Google OAuth 2.0 strategy.
 *
 * This middleware handles the OAuth 2.0 authentication flow with Google. It includes,
 * - Sending the user to Google's OAuth 2.0 authentication page.
 * - Handling the callback after authentication with Google's servers.
 * - Finding or creating a user in the database based on their Google profile.
 */
passport_1.default.use(new passport_google_oauth20_1.default({
    // Google OAuth 2.0 options
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/cb",
}, 
/**
 *
 * It either finds the user in the database by their Google ID (or) creates a
 * new user if none exists.
 *
 * @param accessToken - The access token provided by Google.
 * @param refreshToken - The refresh token provided by Google (unused here).
 * @param profile - The authenticated user's profile information from Google.
 * @param done - The callback to signal the completion of authentication.
 */
(accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if a user with the given Google ID already exists in the database
    const user = yield user_model_1.default.findOne({ googleId: profile.id });
    // If user exists, complete authentication by passing the user ID
    if (user) {
        done(null, user._id.toString());
        return;
    }
    // If user does not exist, create a new user in the database
    const newUser = yield new user_model_1.default({
        username: profile.displayName,
        googleId: profile.id,
        profileImg: profile.photos[0].value,
    }).save();
    const serializeUserPayload = newUser._id.toString();
    done(null, serializeUserPayload);
})));
exports.default = passport_1.default;
