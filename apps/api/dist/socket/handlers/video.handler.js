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
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoEventHandler = videoEventHandler;
exports.loadVideoHandler = loadVideoHandler;
exports.loadVideoQueueHandler = loadVideoQueueHandler;
const room_service_1 = require("../../services/room.service");
const video_service_1 = require("../../services/video.service");
/**
 * This function will handle events for the video player.
 *
 * @param socket
 * @param event
 * @param payload
 */
function videoEventHandler(socket, event, payload) {
    // Check if the user is in a room
    if (!socket.request.session.roomId) {
        socket.emit('socket:error', 'You are not in a room');
        socket.disconnect(true);
    }
    // Emit the play event to all users in the room
    socket.to(socket.request.session.roomId).emit(event, payload);
}
function loadVideoHandler(roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        const video = yield (0, room_service_1.getPlayingVideo)(roomId);
        return video;
    });
}
/**
 * Video Queue
 */
function loadVideoQueueHandler(roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!roomId) {
            return;
        }
        const videoQueue = yield (0, video_service_1.getVideoQueueService)(roomId);
        return videoQueue;
    });
}
