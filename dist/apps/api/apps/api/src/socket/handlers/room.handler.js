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
var room_handler_exports = {};
__export(room_handler_exports, {
  joinHandler: () => joinHandler,
  membersList: () => membersList
});
module.exports = __toCommonJS(room_handler_exports);
var import_room = require("../../services/room.service");
var import_utils = require("../lib/utils");
async function joinHandler(socket, roomId) {
  try {
    const isMemberJoined = await (0, import_room.joinMember)(
      roomId,
      socket.request.session.user.id
    );
    if (!isMemberJoined) {
      socket.emit(
        "socket:error",
        "Failed to join the room. Please try again later."
      );
      return false;
    }
    socket.join(roomId);
    socket.request.session.roomId = roomId;
    return true;
  } catch (error) {
    socket.emit("socket:error", error.message);
    return false;
  }
}
async function membersList(socket) {
  const roomId = socket.request.session.roomId;
  if (!roomId) {
    (0, import_utils.emitError)(socket, "There is no roomId to send members list");
    return null;
  }
  const members_list = await (0, import_room.getRoomMembersService)(roomId);
  return members_list;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  joinHandler,
  membersList
});
