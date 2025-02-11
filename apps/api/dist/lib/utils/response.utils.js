"use strict";
// utils/response.utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = successResponse;
exports.errorResponse = errorResponse;
function successResponse(data) {
    return {
        success: true,
        error: null,
        data,
    };
}
function errorResponse(status, message, statusCode = 500) {
    return {
        success: false,
        status,
        error: {
            message,
            statusCode,
        },
    };
}
