"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = globalErrorHandler;
const response_utils_1 = require("../lib/utils/response.utils");
/**
 * Error handling middleware.
 * Captures and processes errors occurring in the application, sending a formatted response to the client.
 *
 * @param err - The error object containing details about the error.
 * @param _req - The HTTP request object (not used here but required by the middleware signature).
 * @param res - The HTTP response object, used to send the error response to the client.
 * @param _next - The next middleware function (not used here but required by the middleware signature).
 *
 * Purpose:
 * - Captures errors that occur during request processing and sends a structured error response to the client.
 */
function globalErrorHandler(err, _req, res, _next) {
    // Ensure the error has a statusCode (default to 500 for server errors)
    err.statusCode = err.statusCode || 500;
    // Set a status string ('error' by default)
    err.status = err.status || 'error';
    // Respond to the client with a structured JSON error response
    res
        .status(err.statusCode) // Set the HTTP status code
        .json((0, response_utils_1.errorResponse)(err.status, // Error status (e.g., 'error', 'fail')
    err.message, // Error message providing details
    err.statusCode // HTTP status code for the error
    ));
}
