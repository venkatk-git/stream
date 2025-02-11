import { Router } from 'express';

import { isAuthenticated } from '../middlewares/auth.middleware';
import {
  connectToRoom,
  createNewRoom,
  joinRoom,
} from '../controllers/rooms.controller';

const router = Router();

/**
 * @route GET /r/
 * @desc Creates a new room for the authenticated user and returns the generated room ID.
 */
router.get('/', isAuthenticated(), createNewRoom);

/**
 * @route GET /r/:id
 * @desc Allows an authenticated user to join an existing room by its room ID.
 */
router.get('/join/:id', isAuthenticated(), joinRoom);

/**
 * @route GET /r/connect/:id
 * @desc Connects an authenticated user to an existing room by its room ID.
 */
router.get('/connect/:id', isAuthenticated(), connectToRoom);

export default router;
