var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var passport_config_exports = {};
__export(passport_config_exports, {
  default: () => passport_config_default
});
module.exports = __toCommonJS(passport_config_exports);
var import_passport = __toESM(require("passport"));
var import_passport_google_oauth20 = __toESM(require("passport-google-oauth20"));
var import_user = __toESM(require("../models/user.model"));
import_passport.default.serializeUser((userId, done) => {
  done(null, userId);
});
import_passport.default.deserializeUser((userId, done) => {
  done(null, userId);
});
import_passport.default.use(
  new import_passport_google_oauth20.default(
    {
      // Google OAuth 2.0 options
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/cb"
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
    async (accessToken, refreshToken, profile, done) => {
      const user = await import_user.default.findOne({ googleId: profile.id });
      if (user) {
        done(null, user._id.toString());
        return;
      }
      const newUser = await new import_user.default({
        username: profile.displayName,
        googleId: profile.id,
        profileImg: profile.photos[0].value
      }).save();
      const serializeUserPayload = newUser._id.toString();
      done(null, serializeUserPayload);
    }
  )
);
var passport_config_default = import_passport.default;
//# sourceMappingURL=passport.config.js.map
