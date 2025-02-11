"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.createRoom = createRoom;
exports.isValidRoom = isValidRoom;
exports.joinMember = joinMember;
exports.connectMember = connectMember;
exports.getRoomMembersService = getRoomMembersService;
exports.getVideo = getVideo;
exports.getPlayingVideo = getPlayingVideo;
exports.handleRoomLock = handleRoomLock;
exports.handleRoomUnlock = handleRoomUnlock;
const str10_36_1 = require("hyperdyperid/lib/str10_36");
const mongoose_1 = __importStar(require("mongoose"));
const room_model_1 = __importDefault(require("../models/room.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const members_model_1 = __importDefault(require("../models/members.model"));
/**
 * Creates a new room with the specified owner.
 *
 * This function validates the `ownerId`, checks if the owner exists in the database,
 * generates a unique room ID, and creates a new room entry in the database.
 * If any step fails, it logs the error and returns `null`.
 *
 * @param ownerId - The ID of the user who will own the room.
 * @returns The unique room ID if the room is created successfully, or `null` if an error occurs.
 */
function createRoom(ownerId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate ownerId
        if (!mongoose_1.default.Types.ObjectId.isValid(ownerId)) {
            console.error('Invalid ownerId');
            return null;
        }
        // Check if owner exists
        const owner = yield user_model_1.default.findById(ownerId);
        if (!owner) {
            console.error(`Owner not found: { ownerId: ${ownerId} }`);
            return null;
        }
        const roomId = (0, str10_36_1.str10_36)();
        const newRoom = new room_model_1.default({
            roomId,
            ownerId,
            members: [ownerId],
        });
        const newMembersList = new members_model_1.default({
            roomId,
            members: {
                name: owner.username,
                memberId: owner.id,
                profileImg: owner.profileImg,
            },
        });
        yield newRoom.save();
        yield newMembersList.save();
        console.info(`Room created: { roomId: ${roomId}, ownerId: ${ownerId} }`);
        return roomId;
    });
}
/**
 * Validates if a room exists in the database.
 *
 * This function checks if a room with the given `roomId` exists by querying the database.
 * It fetches only the `roomId` field to optimize the query.
 *
 * @param roomId - The unique identifier of the room to validate.
 * @returns {Promise<boolean>} - Returns `true` if the room exists, otherwise `false`.
 *
 * Usage:
 * - Use this function to ensure that the requested room exists before performing operations on it.
 *
 * Note:
 * - If an error occurs during the validation process (e.g., database connectivity issues),
 *   it logs the error and returns `false`.
 */
function isValidRoom(roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if room exists
        const room = yield room_model_1.default.exists({ roomId });
        console.info(`Room validation: { roomId: ${roomId}, isValid: ${room} }`);
        return room !== null;
    });
}
/**
 * Adds a user to a room if the user is not already a member.
 *
 * This function checks if the user and the room exist, and if the user is not already a member of the room,
 * it adds the user to the room's members list. It also validates the `userId` and `roomId`, ensuring they are valid
 * before attempting to update the room.
 *
 * @param roomId - The unique identifier of the room to join.
 * @param userId - The unique identifier of the user trying to join the room.
 * @returns {Promise<boolean>} - Returns `true` if the user joined the room successfully, otherwise `false`.
 *
 * Usage:
 * - Use this function to allow users to join a room while ensuring they are not added more than once.
 */
function joinMember(roomId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate userId
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            console.error('Invalid userId');
            return false;
        }
        // Check if user exists
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            console.error(`User not found: { userId: ${userId} }`);
            return false;
        }
        // Check if room exists
        const isRoomValid = yield isValidRoom(roomId);
        if (!isRoomValid) {
            console.error(`Room not found: { roomId: ${roomId} }`);
            return false;
        }
        // Get the room and its members
        const room = yield room_model_1.default.findOne({ roomId }).select('members roomType');
        if (!room) {
            console.error(`Room not found: { roomId: ${roomId} }`);
            return false;
        }
        // Prevent joining if the room is private
        if (room.roomType === 'private') {
            console.info(`User cannot connect to private room: { roomId: ${roomId}, userId: ${userId} }`);
            return false;
        }
        const userObjectId = new mongoose_1.Types.ObjectId(userId);
        // Add user to the room if not already a member
        if (room.members.includes(userObjectId)) {
            console.info(`User joined room: { roomId: ${roomId}, userId: ${userId} }`);
            return true;
        }
        // Add the user to the room's members list
        yield room_model_1.default.findOneAndUpdate({ roomId }, { $addToSet: { members: userObjectId } } // Add only if the user is not already in the list
        );
        const membersList = yield members_model_1.default.findOneAndUpdate({ roomId }, {
            $addToSet: {
                members: {
                    name: user.username,
                    memberId: user._id,
                    profileImg: user.profileImg,
                },
            },
        });
        if (!membersList) {
            console.error(`Failed to update members list for roomId: ${roomId}`);
            return false;
        }
        console.info(`User joined room: { roomId: ${roomId}, userId: ${userId} }`);
        return true;
    });
}
/**
 * Connects a user to a room if the user and room exist.
 * Validates the user and room, checks if the user is already connected,
 * and connects the user if not already a member.
 *
 * @param roomId - The ID of the room to connect the user to.
 * @param userId - The ID of the user to connect to the room.
 * @returns {Promise<boolean>} - Returns true if the user is successfully
 *                               connected or already connected, false otherwise.
 */
function connectMember(roomId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate userId
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            console.error('Invalid userId');
            return false;
        }
        // Convert userId to ObjectId
        const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
        // Check if user exists
        const user = yield user_model_1.default.findById(userObjectId);
        if (!user) {
            console.error(`User not found: { userId: ${userId} }`);
            return false;
        }
        // Check if room exists
        const room = yield isValidRoom(roomId);
        if (!room) {
            console.error(`Room not found: { roomId: ${roomId} }`);
            return false;
        }
        // Check if the user is already a member of the room
        const isUserInRoom = yield room_model_1.default.exists({ roomId, members: userObjectId });
        if (isUserInRoom) {
            console.info(`User already connected to room: { roomId: ${roomId}, userId: ${userId} }`);
            return true;
        }
        // If not already connected, delegate to the `joinMemberService` to add the user to the room
        return joinMember(roomId, userId);
    });
}
function getRoomMembersService(roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!roomId) {
                console.error(`Room not found: { roomId: ${roomId} }`);
                return null;
            }
            // Check if room exists
            const isRoomValid = yield isValidRoom(roomId);
            if (!isRoomValid) {
                console.error(`Room not found: { roomId: ${roomId} }`);
                return null;
            }
            const members_list = yield members_model_1.default.findOne({ roomId }).select('members');
            if (!members_list) {
                console.error(`Member list not found with room id : ${roomId}`);
                return null;
            }
            return members_list.members;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
}
/**
 * !!! TEMPORARY SOLUTION FOR LOADING RECENT PLAYING VIDEO
 *
 * @param roomId
 * @returns
 */
function getVideo(roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!roomId) {
                console.error(`Room not found: { roomId: ${roomId} }`);
                return null;
            }
            // Check if room exists
            const isRoomValid = yield isValidRoom(roomId);
            if (!isRoomValid) {
                console.error(`Room not found: { roomId: ${roomId} }`);
                return null;
            }
            const room = yield room_model_1.default.findOne({ roomId });
            const videoQueue = room === null || room === void 0 ? void 0 : room.videoQueue;
            // console.log(videoQueue);
            if (!videoQueue || videoQueue.length === 0)
                return null;
            return videoQueue[0];
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
}
/**
 *
 * @param roomId
 * @returns
 */
function getPlayingVideo(roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!roomId) {
                console.error(`Room not found: { roomId: ${roomId} }`);
                return null;
            }
            // Check if room exists
            const isRoomValid = yield isValidRoom(roomId);
            if (!isRoomValid) {
                console.error(`Room not found: { roomId: ${roomId} }`);
                return null;
            }
            const room = yield room_model_1.default.findOne({ roomId });
            if (room.videoQueue.length == 0)
                return null;
            const video = room.videoQueue.filter((video) => video.videoId === room.playingVideo.videoId);
            return {
                videoId: video[0].videoId,
                timeStamp: room.playingVideo.timeStamp,
                title: video[0].title,
            };
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
}
/**
 *
 *
 * @param roomId
 * @returns
 */
function handleRoomLock(roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!roomId) {
                console.error(`Room not found: { roomId: ${roomId} }`);
                return null;
            }
            // Check if room exists
            const isRoomValid = yield isValidRoom(roomId);
            if (!isRoomValid) {
                console.error(`Room not found: { roomId: ${roomId} }`);
                return null;
            }
            yield room_model_1.default.findOneAndUpdate({ roomId }, { roomType: 'private' }, { new: true });
        }
        catch (error) {
            console.error(error);
        }
    });
}
/**
 *
 * @param roomId
 * @param played
 * @returns
 */
function handleRoomUnlock(roomId, played) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!roomId) {
                console.error(`Room not found: { roomId: ${roomId} }`);
                return null;
            }
            // Check if room exists
            const isRoomValid = yield isValidRoom(roomId);
            if (!isRoomValid) {
                console.error(`Room not found: { roomId: ${roomId} }`);
                return null;
            }
            const room = yield room_model_1.default.findOne({ roomId });
            room.roomType = 'public';
            room.playingVideo.timeStamp = played;
            yield room.save();
        }
        catch (error) {
            console.error(error);
        }
    });
}
