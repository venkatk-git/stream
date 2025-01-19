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
var room_service_exports = {};
__export(room_service_exports, {
  connectMemberService: () => connectMemberService,
  createRoomService: () => createRoomService,
  getRoomMembers: () => getRoomMembers,
  getVideo: () => getVideo,
  isValidRoomService: () => isValidRoomService,
  joinMemberService: () => joinMemberService
});
module.exports = __toCommonJS(room_service_exports);
var import_str10_36 = require("hyperdyperid/lib/str10_36");
var import_mongoose = __toESM(require("mongoose"));
var import_room = __toESM(require("../models/room.model"));
var import_user = __toESM(require("../models/user.model"));
var import_members = __toESM(require("../models/members.model"));
async function createRoomService(ownerId) {
  if (!import_mongoose.default.Types.ObjectId.isValid(ownerId)) {
    console.error("Invalid ownerId");
    return null;
  }
  const owner = await import_user.default.findById(ownerId);
  if (!owner) {
    console.error(`Owner not found: { ownerId: ${ownerId} }`);
    return null;
  }
  const roomId = (0, import_str10_36.str10_36)();
  const newRoom = new import_room.default({
    roomId,
    ownerId,
    members: [ownerId]
  });
  const newMembersList = new import_members.default({
    roomId,
    members: {
      name: owner.username,
      memberId: owner.id,
      profileImg: owner.profileImg
    }
  });
  await newRoom.save();
  await newMembersList.save();
  console.info(`Room created: { roomId: ${roomId}, ownerId: ${ownerId} }`);
  return roomId;
}
async function isValidRoomService(roomId) {
  const room = await import_room.default.exists({ roomId });
  console.info(`Room validation: { roomId: ${roomId}, isValid: ${room} }`);
  return room !== null;
}
async function joinMemberService(roomId, userId) {
  if (!import_mongoose.default.Types.ObjectId.isValid(userId)) {
    console.error("Invalid userId");
    return false;
  }
  const user = await import_user.default.findById(userId);
  if (!user) {
    console.error(`User not found: { userId: ${userId} }`);
    return false;
  }
  const isRoomValid = await isValidRoomService(roomId);
  if (!isRoomValid) {
    console.error(`Room not found: { roomId: ${roomId} }`);
    return false;
  }
  const room = await import_room.default.findOne({ roomId }).select("members roomType");
  if (!room) {
    console.error(`Room not found: { roomId: ${roomId} }`);
    return false;
  }
  const userObjectId = new import_mongoose.Types.ObjectId(userId);
  if (room.members.includes(userObjectId)) {
    console.info(`User joined room: { roomId: ${roomId}, userId: ${userId} }`);
    return true;
  }
  if (room.roomType === "private") {
    console.info(
      `User cannot connect to private room: { roomId: ${roomId}, userId: ${userId} }`
    );
    return false;
  }
  await import_room.default.findOneAndUpdate(
    { roomId },
    { $addToSet: { members: userObjectId } }
    // Add only if the user is not already in the list
  );
  const membersList = await import_members.default.findOneAndUpdate(
    { roomId },
    {
      $addToSet: {
        members: {
          name: user.username,
          memberId: user._id,
          profileImg: user.profileImg
        }
      }
    }
  );
  if (!membersList) {
    console.error(`Failed to update members list for roomId: ${roomId}`);
    return false;
  }
  console.info(`User joined room: { roomId: ${roomId}, userId: ${userId} }`);
  return true;
}
async function connectMemberService(roomId, userId) {
  if (!import_mongoose.default.Types.ObjectId.isValid(userId)) {
    console.error("Invalid userId");
    return false;
  }
  const userObjectId = new import_mongoose.default.Types.ObjectId(userId);
  const user = await import_user.default.findById(userObjectId);
  if (!user) {
    console.error(`User not found: { userId: ${userId} }`);
    return false;
  }
  const room = await isValidRoomService(roomId);
  if (!room) {
    console.error(`Room not found: { roomId: ${roomId} }`);
    return false;
  }
  const isUserInRoom = await import_room.default.exists({ roomId, members: userObjectId });
  if (isUserInRoom) {
    console.info(
      `User already connected to room: { roomId: ${roomId}, userId: ${userId} }`
    );
    return true;
  }
  return joinMemberService(roomId, userId);
}
async function getRoomMembers(roomId) {
  try {
    if (!roomId) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }
    const isRoomValid = await isValidRoomService(roomId);
    if (!isRoomValid) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }
    const members_list = await import_members.default.findOne({ roomId }).select("members");
    if (!members_list) {
      console.error(`Member list not found with room id : ${roomId}`);
      return null;
    }
    return members_list.members;
  } catch (error) {
    console.error(error);
    return null;
  }
}
async function getVideo(roomId) {
  try {
    if (!roomId) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }
    const isRoomValid = await isValidRoomService(roomId);
    if (!isRoomValid) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }
    const room = await import_room.default.findOne({ roomId });
    const videoQueue = room?.videoQueue;
    if (!videoQueue || videoQueue.length === 0)
      return null;
    return videoQueue[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  connectMemberService,
  createRoomService,
  getRoomMembers,
  getVideo,
  isValidRoomService,
  joinMemberService
});
//# sourceMappingURL=room.service.js.map
