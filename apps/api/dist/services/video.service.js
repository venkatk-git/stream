"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoQueueService = getVideoQueueService;
exports.addVideoToQueueService = addVideoToQueueService;
exports.updatePlayingVideoService = updatePlayingVideoService;
const axios_1 = __importDefault(require("axios"));
const room_model_1 = __importDefault(require("../models/room.model"));
const room_service_1 = require("./room.service");
/**
 * Retrieves the video queue for a specific room.
 *
 * @param roomId - The unique identifier of the room.
 * @returns The video queue of the room if it exists, otherwise `null`.
 */
function getVideoQueueService(roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate the input parameter
            if (!roomId) {
                console.error(`Room not found: { roomId: ${roomId} }`);
                return null;
            }
            // Check if the room exists by validating its ID
            const isRoomValid = yield (0, room_service_1.isValidRoom)(roomId);
            if (!isRoomValid) {
                console.error(`Room not found: { roomId: ${roomId} }`);
                return null;
            }
            // Retrieve the video queue for the room from the database
            const video_queue = yield room_model_1.default.findOne({ roomId }).select('videoQueue');
            // Return the video queue
            return video_queue.videoQueue;
        }
        catch (error) {
            // Log and handle any errors that occur during execution
            console.error(error);
            return null;
        }
    });
}
/**
 * Adds a video to the video queue of a specific room.
 *
 * @param roomId - The unique identifier of the room.
 * @param videoId - The unique identifier of the YouTube video to be added.
 * @returns The updated video queue if successful, otherwise `null`.
 */
function addVideoToQueueService(roomId, videoId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate the roomId parameter
            if (!roomId) {
                console.error(`Room not found: { roomId: ${roomId} }`);
                return null;
            }
            // Check if the room exists by validating its ID
            const isRoomValid = yield (0, room_service_1.isValidRoom)(roomId);
            if (!isRoomValid) {
                console.error(`Room not found: { roomId: ${roomId} }`);
                return null;
            }
            // Retrieve the room from the database
            const room = yield room_model_1.default.findOne({ roomId });
            // Fetch video details from the YouTube API using the provided videoId
            const ytResponse = yield axios_1.default.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.GOOGLE_API_KEY}`);
            // Check if the response from the YouTube API is valid and contains video details
            if (ytResponse.statusText != 'OK' || ytResponse.data.items.length == 0) {
                return null;
            }
            // Extract the video title from the YouTube API response
            const title = ytResponse.data.items[0].snippet.title;
            // Add the video details to the room's video queue
            const videoQueue = room === null || room === void 0 ? void 0 : room.videoQueue;
            videoQueue.push({
                videoId,
                title,
            });
            // Save the updated room information in the database
            yield room.save();
            // Return the updated video queue
            return videoQueue;
        }
        catch (error) {
            // Log and handle any errors that occur during execution
            console.error(error);
            return null;
        }
    });
}
function updatePlayingVideoService(roomId, videoId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate the roomId parameter
            if (!roomId) {
                console.error(`Room not found: { roomId: ${roomId} }`);
                return null;
            }
            // Check if the room exists by validating its ID
            const isRoomValid = yield (0, room_service_1.isValidRoom)(roomId);
            if (!isRoomValid) {
                console.error(`Room not found: { roomId: ${roomId} }`);
                return null;
            }
            // Retrieve the room from the database
            const room = yield room_model_1.default.findOne({ roomId });
            // Add the video details to the room's video queue
            const videoQueue = room === null || room === void 0 ? void 0 : room.videoQueue;
            /**
             * Updating playing video
             */
            room.playingVideo = {
                videoId,
                timeStamp: 0,
            };
            // Save the updated room information in the database
            yield room.save();
            // Return the updated video queue
            return videoQueue;
        }
        catch (error) {
            // Log and handle any errors that occur during execution
            console.error(error);
            return null;
        }
    });
}
