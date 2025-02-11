"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    /**
     * @param message - The error message to be sent to the client or logged.
     * @param statusCode - The HTTP status code to indicate the type of error (default is 500 if not provided).
     */
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
