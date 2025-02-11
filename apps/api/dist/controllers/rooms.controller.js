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
exports.connectToRoom = exports.joinRoom = exports.createNewRoom = void 0;
const room_service_1 = require("../services/room.service");
const catchAsync_1 = require("../lib/utils/catchAsync");
const response_utils_1 = require("../lib/utils/response.utils");
/**
 * @route GET /r
 *
 * The function performs the following actions:
 * - Retrieves the authenticated user's ID from the request.
 * - Calls the service function to create a new room using the user's ID.
 * - Returns the generated room ID in a JSON response with a 201 status code.
 * - Catches any errors during the process and forwards them to the global error handler.
 *
 * @param req - The request object containing the authenticated user's information.
 * @param res - The response object used to send the status and room ID back to the client.
 * @param next - The next function to pass control to the error handling middleware in case of errors.
 * @access Private (requires authentication)
 */
exports.createNewRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Call the service function to create a room using the authenticated user's ID
    const roomId = yield (0, room_service_1.createRoom)(req.user.id);
    // Send a successful response with the generated roomId
    res.status(201).json((0, response_utils_1.successResponse)({ roomId }));
}));
/**
 * !!IMPORTANT!! This function is not used in the application and is provided as a reference.
 *
 *  The function performs the following actions:
 * - Retrieves the room ID from the URL parameters.
 * - Validates if the room ID exists and is valid by calling the service function.
 * - If the room ID is invalid, returns a 400 error response with a relevant message.
 * - Attempts to add the authenticated user as a member of the room.
 * - Propagates the request to the service to attempt adding the authenticated user as a member of the room.
 * - If the user successfully joins the room, the service returns a success status, and a 200 response is sent back to the client.
 *
 * @param req - The request object containing the room ID in the URL parameters and authenticated user information.
 * @param res - The response object used to send the status and messages back to the client.
 * @param next - The next function to pass control to the next middleware in case of an error.
 * @access Private (requires authentication)
 */
exports.joinRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.id;
    // Check if the room ID is valid
    const _isValidRoom = yield (0, room_service_1.isValidRoom)(roomId);
    if (!_isValidRoom) {
        return res
            .status(400)
            .json((0, response_utils_1.errorResponse)('', 'Invalid room ID. Please check the room ID and try again.', 400));
    }
    // Attempt to add the user as a member of the room
    const isMemberJoined = (0, room_service_1.joinMember)(roomId, req.user.id);
    if (!isMemberJoined) {
        return res
            .status(400)
            .json((0, response_utils_1.errorResponse)('', 'Failed to join the room. Please try again later.', 400));
    }
    // If successful, return a success response
    res.status(200).json((0, response_utils_1.successResponse)(null));
}));
/**
 * !!IMPORTANT!! This function is not used in the application and is provided as a reference.
 *
 * @desc Allows an authenticated user to connect to an existing room by its room ID.
 * The function performs the following actions:
 * - Retrieves the room ID from the URL parameters and the authenticated user's ID from the request.
 * - Calls the service function to check if the user can connect to the room.
 * - If the connection is not possible (e.g., invalid room ID), returns a 400 error response with a relevant message.
 * - If the user successfully connects to the room, returns a 201 status code indicating successful connection.
 *
 * @param req - The request object containing the room ID in the URL parameters and the authenticated user’s ID.
 * @param res - The response object used to send the status and messages back to the client.
 * @param next - The next function to pass control to the next middleware in case of an error.
 * @access Private (requires authentication)
 */
exports.connectToRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.id;
    const userId = req.user.id;
    const canConnect = yield (0, room_service_1.connectMember)(roomId, userId);
    if (!canConnect) {
        return res
            .status(400)
            .json((0, response_utils_1.errorResponse)('', 'Invalid room ID. Please check the room ID and try again.', 400));
    }
    res.status(201).json((0, response_utils_1.successResponse)(null));
    console.info(`User connected to room: { roomId: ${roomId}, userId: ${userId} }`);
}));
