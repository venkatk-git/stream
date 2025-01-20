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
var video_service_exports = {};
__export(video_service_exports, {
  addVideoToQueueService: () => addVideoToQueueService,
  getVideoQueueService: () => getVideoQueueService,
  updatePlayingVideoService: () => updatePlayingVideoService
});
module.exports = __toCommonJS(video_service_exports);
var import_axios = __toESM(require("axios"));
var import_room = __toESM(require("../models/room.model"));
var import_room2 = require("./room.service");
async function getVideoQueueService(roomId) {
  try {
    if (!roomId) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }
    const isRoomValid = await (0, import_room2.isValidRoomService)(roomId);
    if (!isRoomValid) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }
    const video_queue = await import_room.default.findOne({ roomId }).select("videoQueue");
    return video_queue.videoQueue;
  } catch (error) {
    console.error(error);
    return null;
  }
}
async function addVideoToQueueService(roomId, videoId) {
  try {
    if (!roomId) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }
    const isRoomValid = await (0, import_room2.isValidRoomService)(roomId);
    if (!isRoomValid) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }
    const room = await import_room.default.findOne({ roomId });
    const ytResponse = await import_axios.default.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.GOOGLE_API_KEY}`
    );
    if (ytResponse.statusText != "OK" || ytResponse.data.items.length == 0) {
      return null;
    }
    const title = ytResponse.data.items[0].snippet.title;
    const videoQueue = room?.videoQueue;
    videoQueue.push({
      videoId,
      title
    });
    await room.save();
    return videoQueue;
  } catch (error) {
    console.error(error);
    return null;
  }
}
async function updatePlayingVideoService(roomId, videoId) {
  try {
    if (!roomId) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }
    const isRoomValid = await (0, import_room2.isValidRoomService)(roomId);
    if (!isRoomValid) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }
    const room = await import_room.default.findOne({ roomId });
    const videoQueue = room?.videoQueue;
    room.playingVideo = {
      videoId,
      timeStamp: 0
    };
    await room.save();
    return videoQueue;
  } catch (error) {
    console.error(error);
    return null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addVideoToQueueService,
  getVideoQueueService,
  updatePlayingVideoService
});
//# sourceMappingURL=video.service.js.map
