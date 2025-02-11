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
exports.joinHandler = joinHandler;
exports.membersList = membersList;
const room_service_1 = require("../../services/room.service");
const utils_1 = require("../lib/utils");
// Define the joinHandler function
function joinHandler(socket, roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Attempt to add the user as a member of the room
            const isMemberJoined = yield (0, room_service_1.joinMember)(roomId, socket.request.session.user.id);
            // If the user is not added as a member, emit an error message
            if (!isMemberJoined) {
                socket.emit('socket:error', 'Failed to join the room. Please try again later.');
                return false;
            }
            // If successful, join the room
            socket.join(roomId);
            socket.request.session.roomId = roomId;
            return true;
        }
        catch (error) {
            // If an error occurs, emit an error message
            socket.emit('socket:error', error.message);
            return false;
        }
    });
}
function membersList(socket) {
    return __awaiter(this, void 0, void 0, function* () {
        const roomId = socket.request.session.roomId;
        if (!roomId) {
            (0, utils_1.emitError)(socket, 'There is no roomId to send members list');
            return null;
        }
        // Fetch the members list
        const members_list = yield (0, room_service_1.getRoomMembersService)(roomId);
        return members_list;
    });
}
