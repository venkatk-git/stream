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
var rooms_controller_exports = {};
__export(rooms_controller_exports, {
  connectToRoom: () => connectToRoom,
  createNewRoom: () => createNewRoom,
  joinRoom: () => joinRoom
});
module.exports = __toCommonJS(rooms_controller_exports);
var import_room = require("../services/room.service");
var import_catchAsync = require("../lib/utils/catchAsync");
var import_response = require("../lib/utils/response.utils");
const createNewRoom = (0, import_catchAsync.catchAsync)(
  async (req, res, next) => {
    const roomId = await (0, import_room.createRoom)(req.user.id);
    res.status(201).json((0, import_response.successResponse)({ roomId }));
  }
);
const joinRoom = (0, import_catchAsync.catchAsync)(
  async (req, res, next) => {
    const roomId = req.params.id;
    const _isValidRoom = await (0, import_room.isValidRoom)(roomId);
    if (!_isValidRoom) {
      return res.status(400).json(
        (0, import_response.errorResponse)(
          "",
          "Invalid room ID. Please check the room ID and try again.",
          400
        )
      );
    }
    const isMemberJoined = (0, import_room.joinMember)(roomId, req.user.id);
    if (!isMemberJoined) {
      return res.status(400).json(
        (0, import_response.errorResponse)(
          "",
          "Failed to join the room. Please try again later.",
          400
        )
      );
    }
    res.status(200).json((0, import_response.successResponse)(null));
  }
);
const connectToRoom = (0, import_catchAsync.catchAsync)(
  async (req, res, next) => {
    const roomId = req.params.id;
    const userId = req.user.id;
    const canConnect = await (0, import_room.connectMember)(roomId, userId);
    if (!canConnect) {
      return res.status(400).json(
        (0, import_response.errorResponse)(
          "",
          "Invalid room ID. Please check the room ID and try again.",
          400
        )
      );
    }
    res.status(201).json((0, import_response.successResponse)(null));
    console.info(
      `User connected to room: { roomId: ${roomId}, userId: ${userId} }`
    );
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  connectToRoom,
  createNewRoom,
  joinRoom
});
