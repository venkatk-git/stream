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
var auth_middleware_exports = {};
__export(auth_middleware_exports, {
  attachUserToRequest: () => attachUserToRequest,
  authorizeUser: () => authorizeUser,
  isAuthenticated: () => isAuthenticated
});
module.exports = __toCommonJS(auth_middleware_exports);
var import_redis = require("../redis");
var import_user = __toESM(require("../models/user.model"));
var import_console = __toESM(require("console"));
function isAuthenticated() {
  return (req, res, next) => {
    if (!req.user || !req.isAuthenticated() || !req.session?.passport?.user) {
      return next(new Error("Not authenticated"));
    }
    return next();
  };
}
function authorizeUser(socket, next) {
  if (!socket.request.session || !socket.request.session.passport || !socket.request.session.passport.user) {
    return next(new Error("User not authorized"));
  }
  socket.user = { ...socket.request.session.user };
  import_redis.redisClient.hset(`userid:${socket.user.id}`, "socketid", socket.id);
  return next();
}
async function attachUserToRequest(req, res, next) {
  try {
    const userId = req.session?.passport?.user;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { message: "User is not authenticated" }
      });
    }
    const user = await import_user.default.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { message: "User not found" }
      });
    }
    req.user = {
      id: user._id.toString(),
      username: user.username,
      googleId: user.googleId,
      profileImg: user.profileImg
    };
    next();
  } catch (error) {
    import_console.default.error("Error attaching user to request:", error);
    res.status(500).json({
      success: false,
      error: { message: "Internal Server Error" }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  attachUserToRequest,
  authorizeUser,
  isAuthenticated
});
//# sourceMappingURL=auth.middleware.js.map
