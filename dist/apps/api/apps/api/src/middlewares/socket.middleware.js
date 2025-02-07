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
var socket_middleware_exports = {};
__export(socket_middleware_exports, {
  attachUserToSocket: () => attachUserToSocket
});
module.exports = __toCommonJS(socket_middleware_exports);
var import_user = __toESM(require("../models/user.model"));
async function attachUserToSocket(socket, next) {
  try {
    const user = await import_user.default.findById(socket.request.session.passport.user);
    if (!user) {
      next(new Error("Unauthorized from socket middleware"));
      return;
    }
    socket.request.session.user = {
      id: user._id.toString(),
      username: user.username,
      googleId: user.googleId,
      profileImg: user.profileImg
    };
    next();
  } catch (error) {
    next(error);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  attachUserToSocket
});
