var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var connection_handler_exports = {};
__export(connection_handler_exports, {
  default: () => connection_handler_default
});
module.exports = __toCommonJS(connection_handler_exports);
function connectionHandler(socket) {
  console.log(`New socket connection: ${socket.id} : ${socket.user.username}`);
  socket.emit("user:new", {
    message: `${socket.user.username} has joined`
  });
}
var connection_handler_default = connectionHandler;
