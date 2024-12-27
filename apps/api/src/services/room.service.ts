import { v4 as uuidV4 } from 'uuid';
import mongoose, { Types } from 'mongoose';

import Room from '../models/room.model';
import User from '../models/user.model';

/**
 * Creates a new room with the specified owner.
 *
 * This function validates the `ownerId`, checks if the owner exists in the database,
 * generates a unique room ID, and creates a new room entry in the database.
 * If any step fails, it logs the error and returns `null`.
 *
 * @param ownerId - The ID of the user who will own the room.
 * @returns The unique room ID if the room is created successfully, or `null` if an error occurs.
 */
export async function createRoomService(
  ownerId: string
): Promise<string | null> {
  try {
    // Validate ownerId
    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      throw new Error('Invalid ownerId');
    }

    // Check if owner exists
    const owner = await User.findById(ownerId);
    if (!owner) {
      throw new Error('Owner not found');
    }

    const roomId = uuidV4();

    // TODO: Create a new room in the database
    const newRoom = new Room({
      roomId: roomId,
      ownerId,
      members: [ownerId],
    });

    await newRoom.save();

    console.info(`Room created: { roomId: ${roomId}, ownerId: ${ownerId} }`);
    return roomId;
  } catch (error) {
    console.error('Room creation failed:', error);
    return null;
  }
}

/**
 * Validates if a room exists in the database.
 *
 * This function checks if a room with the given `roomId` exists by querying the database.
 * It fetches only the `roomId` field to optimize the query.
 *
 * @param roomId - The unique identifier of the room to validate.
 * @returns {Promise<boolean>} - Returns `true` if the room exists, otherwise `false`.
 *
 * Usage:
 * - Use this function to ensure that the requested room exists before performing operations on it.
 *
 * Note:
 * - If an error occurs during the validation process (e.g., database connectivity issues),
 *   it logs the error and returns `false`.
 */
export async function isValidRoomService(roomId: string): Promise<boolean> {
  try {
    // Check if room exists
    const room = await Room.findOne({ roomId }).select('roomId');

    return room !== null;
  } catch (error) {
    console.error(`Failed to validate room with ID: ${roomId}`, error);
    return false;
  }
}

/**
 * Adds a user to a room if the user is not already a member.
 *
 * This function checks if the user and the room exist, and if the user is not already a member of the room,
 * it adds the user to the room's members list. It also validates the `userId` and `roomId`, ensuring they are valid
 * before attempting to update the room.
 *
 * @param roomId - The unique identifier of the room to join.
 * @param userId - The unique identifier of the user trying to join the room.
 * @returns {Promise<boolean>} - Returns `true` if the user joined the room successfully, otherwise `false`.
 *
 * Usage:
 * - Use this function to allow users to join a room while ensuring they are not added more than once.
 */
export async function joinMemberService(roomId: string, userId: string) {
  try {
    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid userId');
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Check if room exists
    const room = await Room.findOne({ roomId });
    if (!room) {
      throw new Error('Room not found');
    }

    const userObjectId = new Types.ObjectId(userId);

    // Add user to the room if not already a member
    if (!room.members.includes(userObjectId)) {
      room.members.push(userObjectId);
      await room.save();
    }

    console.info(`User joined room: { roomId: ${roomId}, userId: ${userId} }`);
    return true;
  } catch (error) {
    console.error('Joining room failed:', error);
    return false;
  }
}
