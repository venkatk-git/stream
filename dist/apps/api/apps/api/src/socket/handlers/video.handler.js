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
var video_handler_exports = {};
__export(video_handler_exports, {
  loadVideoHandler: () => loadVideoHandler,
  loadVideoQueueHandler: () => loadVideoQueueHandler,
  videoEventHandler: () => videoEventHandler
});
module.exports = __toCommonJS(video_handler_exports);
var import_room = require("../../services/room.service");
var import_video = require("../../services/video.service");
function videoEventHandler(socket, event, payload) {
  if (!socket.request.session.roomId) {
    socket.emit("socket:error", "You are not in a room");
    socket.disconnect(true);
  }
  socket.to(socket.request.session.roomId).emit(event, payload);
}
async function loadVideoHandler(roomId) {
  const video = await (0, import_room.getPlayingVideoService)(roomId);
  return video;
}
async function loadVideoQueueHandler(roomId) {
  if (!roomId) {
    return;
  }
  const videoQueue = await (0, import_video.getVideoQueueService)(roomId);
  return videoQueue;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loadVideoHandler,
  loadVideoQueueHandler,
  videoEventHandler
});
//# sourceMappingURL=video.handler.js.map
