import { Router } from 'express';

import { isAuthenticated } from '../middlewares/auth.middleware';
import {
  createRoomService,
  isValidRoomService,
  joinMemberService,
} from '../services/room.service';

import { errorResponse, successResponse } from '../lib/utils/response.utils';

import { ExtendedRequest } from '../lib/types';

const router = Router();

/**
 * GET '/r/' - Creates a new room and returns the generated room ID.
 */
router.get('/', isAuthenticated(), async (req: ExtendedRequest, res) => {
  try {
    const roomId = await createRoomService(req.user.id);

    res.status(201).json(successResponse({ roomId }));
  } catch (err) {
    /**
     * TODO: Create a Global error handling middleware.
     */
    console.error(err);

    res
      .status(500)
      .json(
        errorResponse(
          'An unexpected error occurred while creating the room. Please try again later.'
        )
      );
  }
});

/**
 * API endpoint to handle the "join room" functionality.
 * This endpoint allows authenticated users to join an existing room by its room ID.
 * The function performs the following actions:
 * - Validates the room ID to ensure the room exists.
 * - Checks if the user is not already a member of the room and attempts to add them.
 * - Returns a success status if the user successfully joins the room, otherwise returns an error.
 *
 * @param req - The request object containing the room ID in the URL and the authenticated user information in the session.
 * @param res - The response object used to send the status and messages back to the client.
 */
router.get('/:id', isAuthenticated(), async (req: ExtendedRequest, res) => {
  try {
    const roomId = req.params.id;

    // Check if the room ID is valid
    const isValidRoom = await isValidRoomService(roomId);
    if (!isValidRoom) {
      return res
        .status(400)
        .json(
          errorResponse(
            'Invalid room ID. Please check the room ID and try again.',
            400
          )
        );
    }

    // Attempt to add the user as a member of the room
    const isMemberJoined = joinMemberService(roomId, req.user.id);
    if (!isMemberJoined) {
      return res
        .status(400)
        .json(
          errorResponse('Failed to join the room. Please try again later.', 400)
        );
    }

    // If successful, return a success response
    res.status(200).json(successResponse(null));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(
        errorResponse('An unexpected error occurred while joining the room.')
      );
  }
});

export default router;
