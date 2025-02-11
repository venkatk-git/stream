"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Handles a new socket connection.
 *
 * This function is called whenever a new socket connection is established.
 *
 * @param socket - The new socket connection.
 */
function connectionHandler(socket) {
    console.log(`New socket connection: ${socket.id} : ${socket.user.username}`);
    socket.emit('user:new', {
        message: `${socket.user.username} has joined`,
    });
}
exports.default = connectionHandler;
