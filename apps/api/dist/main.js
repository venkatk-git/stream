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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
const auth_middleware_1 = require("./middlewares/auth.middleware");
const socket_middleware_1 = require("./middlewares/socket.middleware");
const session_middleware_1 = require("./middlewares/session.middleware.");
const room_handler_1 = require("./socket/handlers/room.handler");
const video_handler_1 = require("./socket/handlers/video.handler");
const app_1 = __importDefault(require("./app"));
const video_service_1 = require("./services/video.service");
const room_service_1 = require("./services/room.service");
const host = (_a = process.env.HOST) !== null && _a !== void 0 ? _a : "localhost";
const port = process.env.PORT || 3000;
/**
 * Creates an HTTP server using the Express app.
 *
 * This server will handle incoming HTTP requests and pass them to the Express
 * application (`app`) for routing and processing.
 */
const server = http_1.default.createServer(app_1.default);
/**
 * Initializes a new instance of Socket.io server.
 *
 * This sets up the Socket.io server to listen on the provided HTTP server
 * (`server`) and configures the CORS (Cross-Origin Resource Sharing) settings
 * to allow connections from `process.env.CLIENT_ORIGIN` with credentials (cookies, etc.).
 */
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_ORIGIN,
        credentials: true,
    },
});
/**
 * Adds security-related HTTP headers to the application using helmet.
 *
 * This middleware helps protect the application from common web vulnerabilities
 * by setting various HTTP headers, such as those for content security,
 * cross-site scripting (XSS) protection, and more...
 *
 * Purpose:
 * - Enhances the security of the application by setting various HTTP headers.
 */
io.engine.use((0, helmet_1.default)());
/**
 * Assigning session middleware to socket.io engine
 *
 * Purpose:
 * - This middleware ensures that session data is available for each incoming socket connection.
 */
io.engine.use(session_middleware_1.sessionMiddleware);
/**
 * Purpose:
 * - This middleware ensures that the user is authenticated before establishing a socket connection.
 */
io.use(auth_middleware_1.authorizeUser);
/**
 * Purpose:
 * - This middleware populates the socket with the authenticated user data, making it available
 * for further socket operations.
 */
io.use(socket_middleware_1.attachUserToSocket);
/**
 * Handles new socket connections.
 *
 * Triggered when a client establishes a socket connection. This function sets up
 * event listeners for the connected socket and provides confirmation of the
 * successful connection in the console.
 *
 * @param socket - The connected socket instance.
 */
io.on("connect", (socket) => {
    console.log(`[socket] ${socket.user.username} has connected`);
    io.emit("user:connected", {
        message: `${socket.user.username} has connected`,
    });
    socket.on("room:join", (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId }) {
        const isJoined = yield (0, room_handler_1.joinHandler)(socket, roomId);
        if (isJoined) {
            io.emit("room:joined", { name: socket.user.username });
            const memberList = yield (0, room_handler_1.membersList)(socket);
            io.to(roomId).emit("room:members_list", memberList);
            // Load initial video on join
            const video = yield (0, video_handler_1.loadVideoHandler)(socket.request.session.roomId);
            if (video) {
                socket.emit("video:load", video);
            }
            const videoQueue = yield (0, video_handler_1.loadVideoQueueHandler)(socket.request.session.roomId);
            if (videoQueue)
                socket.emit("video_queue:update", videoQueue);
        }
        else {
            socket.emit("room:join_error", {
                message: "Failed to join room",
            });
        }
        // Send Member list on join
    }));
    /**
     * Room State Changes
     */
    socket.on("room:lock", () => (0, room_service_1.handleRoomLock)(socket.request.session.roomId));
    socket.on("room:unlock", (played) => (0, room_service_1.handleRoomUnlock)(socket.request.session.roomId, played));
    /**
     * Video State Changes
     */
    socket.on("video:play", () => {
        io.to(socket.request.session.roomId).emit("video:play", socket.user.username);
    });
    socket.on("video:pause", () => {
        io.to(socket.request.session.roomId).emit("video:pause", socket.user.username);
    });
    socket.on("video:seek", (seekTo) => {
        io.to(socket.request.session.roomId).emit("video:seek", seekTo);
    });
    socket.on("video:load", (video) => {
        io.to(socket.request.session.roomId).emit("video:load", video);
    });
    /**
     * Video Queue
     */
    socket.on("video_queue:add", (videoId) => __awaiter(void 0, void 0, void 0, function* () {
        const videoQueue = yield (0, video_service_1.addVideoToQueueService)(socket.request.session.roomId, videoId);
        io.to(socket.request.session.roomId).emit("video_queue:update", videoQueue);
    }));
    socket.on("disconnect", () => {
        io.emit("user:disconnected", {
            message: `${socket.user.username} has disconnected`,
        });
    });
});
server.listen(port, () => {
    console.log(`[ ready ] http://${host}:${port}`);
});
