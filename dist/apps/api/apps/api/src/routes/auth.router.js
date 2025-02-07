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
var auth_router_exports = {};
__export(auth_router_exports, {
  default: () => auth_router_default
});
module.exports = __toCommonJS(auth_router_exports);
var import_express = require("express");
var import_passport = __toESM(require("../config/passport.config"));
var import_user = __toESM(require("../models/user.model"));
const router = (0, import_express.Router)();
router.get(
  "/google",
  import_passport.default.authenticate("google", {
    scope: ["profile", "email"]
  })
);
router.get(
  "/google/cb",
  import_passport.default.authenticate("google", {
    failureRedirect: "/auth/google"
  }),
  async (req, res) => {
    const user = await import_user.default.findById(req.session.passport.user);
    if (!user) {
      console.error("User not found");
      return res.status(404).redirect("/auth/google");
    }
    req.user = {
      id: user._id.toString(),
      username: user.username,
      googleId: user.googleId,
      profileImg: user.profileImg
    };
    req.session.user = req.user;
    res.redirect("http://localhost:4200/");
  }
);
var auth_router_default = router;
