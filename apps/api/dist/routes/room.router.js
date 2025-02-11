"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const rooms_controller_1 = require("../controllers/rooms.controller");
const router = (0, express_1.Router)();
/**
 * @route GET /r/
 * @desc Creates a new room for the authenticated user and returns the generated room ID.
 */
router.get('/', (0, auth_middleware_1.isAuthenticated)(), rooms_controller_1.createNewRoom);
/**
 * @route GET /r/:id
 * @desc Allows an authenticated user to join an existing room by its room ID.
 */
router.get('/join/:id', (0, auth_middleware_1.isAuthenticated)(), rooms_controller_1.joinRoom);
/**
 * @route GET /r/connect/:id
 * @desc Connects an authenticated user to an existing room by its room ID.
 */
router.get('/connect/:id', (0, auth_middleware_1.isAuthenticated)(), rooms_controller_1.connectToRoom);
exports.default = router;
