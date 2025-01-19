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
var session_middleware_exports = {};
__export(session_middleware_exports, {
  sessionMiddleware: () => sessionMiddleware
});
module.exports = __toCommonJS(session_middleware_exports);
var import_express_session = __toESM(require("express-session"));
var import_connect_redis = require("connect-redis");
var import_redis = require("../redis");
const sessionMiddleware = (0, import_express_session.default)({
  name: "session_id",
  store: new import_connect_redis.RedisStore({ client: import_redis.redisClient }),
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    maxAge: 1e3 * 60 * 60 * 24,
    secure: false,
    httpOnly: true,
    sameSite: "lax"
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sessionMiddleware
});
//# sourceMappingURL=session.middleware..js.map
