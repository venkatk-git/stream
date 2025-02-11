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
const express_1 = require("express");
const passport_config_1 = __importDefault(require("../config/passport.config"));
const user_model_1 = __importDefault(require("../models/user.model"));
const router = (0, express_1.Router)();
/**
 * Initiates Google OAuth 2.0 authentication.
 *
 * This route redirects the user to Google's OAuth 2.0 authentication page.
 * The `scope` specifies the permissions being requested, including access
 * to the user's profile and email address.
 */
router.get('/google', passport_config_1.default.authenticate('google', {
    scope: ['profile', 'email'],
}));
/**
 * OAuth 2.0 callback route for Google authentication.
 *
 * This route handles the callback from Google's OAuth 2.0 flow. After successful
 * authentication, the user's details are retrieved from the database and attached
 * to both the request object (`req.user`) and the session (`req.session.user`).
 *
 *  The user is then redirected to the front-end application at
 * `http://localhost:4200/connectSocket`. If the user is not found, the request is
 * redirected back to the Google authentication initiation route (`/auth/google`).
 */
router.get('/google/cb', passport_config_1.default.authenticate('google', {
    failureRedirect: '/auth/google',
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(req.session.passport.user);
    if (!user) {
        console.error('User not found');
        return res.status(404).redirect('/auth/google');
    }
    req.user = {
        id: user._id.toString(),
        username: user.username,
        googleId: user.googleId,
        profileImg: user.profileImg,
    };
    req.session.user = req.user;
    // res.redirect('/protected');
    res.redirect('http://localhost:4200/');
}));
exports.default = router;
