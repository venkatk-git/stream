"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitError = emitError;
function emitError(socket, error) {
    socket.emit('socket:error', {
        error,
    });
}
