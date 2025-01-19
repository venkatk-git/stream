var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_http = __toESM(require("http"));
var import_socket = require("socket.io");
var import_helmet = __toESM(require("helmet"));
var import_dotenv = __toESM(require("dotenv"));
var import_auth = require("./middlewares/auth.middleware");
var import_socket2 = require("./middlewares/socket.middleware");
var import_session_middleware = require("./middlewares/session.middleware.");
var import_room = require("./socket/handlers/room.handler");
var import_video = require("./socket/handlers/video.handler");
var import_app = __toESM(require("./app"));
var import_video2 = require("./services/video.service");
import_dotenv.default.config({ path: "../.env.local" });
const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3e3;
const server = import_http.default.createServer(import_app.default);
const io = new import_socket.Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
  }
});
io.engine.use((0, import_helmet.default)());
io.engine.use(import_session_middleware.sessionMiddleware);
io.use(import_auth.authorizeUser);
io.use(import_socket2.attachUserToSocket);
io.on("connect", (socket) => {
  console.log(`[socket] ${socket.user.username} has connected`);
  io.emit("user:connected", {
    message: `${socket.user.username} has connected`
  });
  socket.on("room:join", async ({ roomId }) => {
    const isJoined = await (0, import_room.joinHandler)(socket, roomId);
    if (isJoined)
      io.emit("room:joined", { name: socket.user.username });
    const memberList = await (0, import_room.membersList)(socket);
    io.to(roomId).emit("room:members_list", memberList);
    const video = await (0, import_video.loadVideoHandler)(socket);
    if (video)
      socket.emit("video:load", video);
    const videoQueue = await (0, import_video.loadVideoQueueHandler)(
      socket.request.session.roomId
    );
    if (videoQueue)
      socket.emit("video_queue:update", videoQueue);
  });
  socket.on("video:play", () => {
    io.to(socket.request.session.roomId).emit(
      "video:play",
      socket.user.username
    );
  });
  socket.on("video:pause", () => {
    io.to(socket.request.session.roomId).emit(
      "video:pause",
      socket.user.username
    );
  });
  socket.on("video:seek", (seekTo) => {
    io.to(socket.request.session.roomId).emit("video:seek", seekTo);
  });
  socket.on("video:load", (video) => {
    io.to(socket.request.session.roomId).emit("video:load", video);
  });
  socket.on("video_queue:add", async (videoId) => {
    const videoQueue = await (0, import_video2.addVideoToQueue)(
      socket.request.session.roomId,
      videoId
    );
    io.to(socket.request.session.roomId).emit("video_queue:update", videoQueue);
  });
  socket.on("disconnect", () => {
    io.emit("user:disconnected", {
      message: `${socket.user.username} has disconnected`
    });
  });
});
server.listen(port, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
//# sourceMappingURL=main.js.map
