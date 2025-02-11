"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const test_router_1 = __importDefault(require("./routes/test.router"));
const room_router_1 = __importDefault(require("./routes/room.router"));
const error_controller_1 = require("./controllers/error.controller");
const session_middleware_1 = require("./middlewares/session.middleware.");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const AppError_1 = __importDefault(require("./lib/utils/AppError"));
const response_utils_1 = require("./lib/utils/response.utils");
const app = (0, express_1.default)();
// CORS
const allowedOrigins = ['http://localhost:4200']; // Add allowed origins here
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, origin);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies and credentials
}));
// Connect to Mongodb
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => {
    console.log('DB CONNECTED');
})
    .catch((e) => {
    console.error(e.message);
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
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
/**
 * Initializes session handling using express-session.
 *
 * This middleware manages the session data for incoming requests, integrating
 * with Passport.js to store user session information and maintain user state
 * across requests.
 *
 * Purpose:
 * - Manages session data for incoming requests, integrating with Passport.js
 */
app.use(session_middleware_1.sessionMiddleware);
// Passport Initialization
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Authentication
app.use('/auth', auth_router_1.default);
/**
 * Middleware to attach the authenticated user to the request object.
 * This ensures that user details are available in `req.user` for all subsequent routes and middleware.
 *
 * Purpose:
 * - Attaches the authenticated user to the request object for easy access in subsequent middleware and routes.
 */
app.use(auth_middleware_1.attachUserToRequest);
app.get('/reqAuth', (0, auth_middleware_1.isAuthenticated)(), (req, res) => {
    const user = req.user;
    res.status(200).json((0, response_utils_1.successResponse)(user));
});
app.get('/', (req, res) => {
    res.send('Home');
});
app.use('/', test_router_1.default);
app.use('/r', room_router_1.default);
app.all('*', (req, res, next) => {
    next(new AppError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
/**
 * Global Error Handling Middleware
 * Attached at the end of the middleware stack.
 *
 * Purpose:
 * - Ensures consistent error responses across the application.
 * - Handles both operational and unexpected errors.
 */
app.use(error_controller_1.globalErrorHandler);
exports.default = app;
