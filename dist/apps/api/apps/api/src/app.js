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
var app_exports = {};
__export(app_exports, {
  default: () => app_default
});
module.exports = __toCommonJS(app_exports);
var import_express = __toESM(require("express"));
var import_mongoose = __toESM(require("mongoose"));
var import_passport = __toESM(require("passport"));
var import_cors = __toESM(require("cors"));
var import_helmet = __toESM(require("helmet"));
var import_auth = __toESM(require("./routes/auth.router"));
var import_test = __toESM(require("./routes/test.router"));
var import_room = __toESM(require("./routes/room.router"));
var import_error = require("./controllers/error.controller");
var import_session_middleware = require("./middlewares/session.middleware.");
var import_auth2 = require("./middlewares/auth.middleware");
var import_AppError = __toESM(require("./lib/utils/AppError"));
var import_response = require("./lib/utils/response.utils");
const app = (0, import_express.default)();
const allowedOrigins = ["http://localhost:4200"];
app.use(
  (0, import_cors.default)({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
    // Allow cookies and credentials
  })
);
import_mongoose.default.connect(process.env.MONGODB_URI).then(() => {
  console.log("DB CONNECTED");
}).catch((e) => {
  console.error(e.message);
});
app.use((0, import_helmet.default)());
app.use(import_express.default.json());
app.use(import_session_middleware.sessionMiddleware);
app.use(import_passport.default.initialize());
app.use(import_passport.default.session());
app.use("/auth", import_auth.default);
app.use(import_auth2.attachUserToRequest);
app.get("/reqAuth", (0, import_auth2.isAuthenticated)(), (req, res) => {
  const user = req.user;
  res.status(200).json((0, import_response.successResponse)(user));
});
app.get("/", (req, res) => {
  res.send("Home");
});
app.use("/", import_test.default);
app.use("/r", import_room.default);
app.all("*", (req, res, next) => {
  next(new import_AppError.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(import_error.globalErrorHandler);
var app_default = app;
