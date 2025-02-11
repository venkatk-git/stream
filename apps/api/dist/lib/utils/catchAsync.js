"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = catchAsync;
/**
 * CatchAsync Utility
 * Wraps an asynchronous route handler function to catch and forward errors to the next middleware.
 *
 * This utility eliminates repetitive try-catch blocks in asynchronous route handlers by
 * automatically passing any errors to the `next` function.
 *
 * @template T - The return type of the asynchronous function.
 * @param fn - An asynchronous function that handles an HTTP request.
 * @returns A function that wraps the provided `fn` and ensures errors are forwarded to the error-handling middleware.
 *
 * Usage:
 * app.get('/', catchAsync(async (req, res, next) => {
 *   const data = await someAsyncOperation();
 *   res.status(200).json(data);
 * }));
 */
function catchAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    };
}
