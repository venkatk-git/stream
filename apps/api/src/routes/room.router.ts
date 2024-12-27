import { Router } from 'express';

import { isAuthenticated } from '../middlewares/auth.middleware';
import { ApiResponse, ExtendedRequest } from '../lib/types';
import { createRoom } from '../services/room.service';

const router = Router();

interface CreateRoomApiResponse extends ApiResponse {
  roomid: string;
}

/**
 * GET '/r/' - Creates a new room and returns the generated room ID.
 */
router.get('/', isAuthenticated(), async (req: ExtendedRequest, res) => {
  try {
    const roomId = await createRoom(req.user.id);

    const response: CreateRoomApiResponse = {
      success: true,
      error: null,
      roomid: roomId,
    };

    res.status(201).json(response);
  } catch (err) {
    console.error(err);

    const response: ApiResponse = {
      success: false,
      error: {
        message:
          'Oops! Something went wrong on our side. Please try again later :)',
      },
    };

    res.status(500).json({ response });
  }
});

/**
 * TODO: Create an api to handle the join room functionality and returns a success status after validations.
 */
router.get('/:id');

export default router;
