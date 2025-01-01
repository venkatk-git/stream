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
  // Validate ownerId
  if (!mongoose.Types.ObjectId.isValid(ownerId)) {
    console.error('Invalid ownerId');
    return null;
  }

  // Check if owner exists
  const owner = await User.findById(ownerId);
  if (!owner) {
    console.error(`Owner not found: { ownerId: ${ownerId} }`);
    return null;
  }

  const roomId = uuidV4();

  const newRoom = new Room({
    roomId: roomId,
    ownerId,
    members: [ownerId],
  });

  await newRoom.save();

  console.info(`Room created: { roomId: ${roomId}, ownerId: ${ownerId} }`);
  return roomId;
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
  // Check if room exists
  const room = await Room.exists({ roomId });

  console.info(`Room validation: { roomId: ${roomId}, isValid: ${room} }`);
  return room !== null;
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
export async function joinMemberService(
  roomId: string,
  userId: string
): Promise<boolean> {
  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error('Invalid userId');
    return false;
  }

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    console.error(`User not found: { userId: ${userId} }`);
    return false;
  }

  // Check if room exists
  const isRoomValid = await isValidRoomService(roomId);
  if (!isRoomValid) {
    console.error(`Room not found: { roomId: ${roomId} }`);
    return false;
  }

  // Get the room and its members
  const room = await Room.findOne({ roomId }).select('members roomType');
  if (!room) {
    console.error(`Room not found: { roomId: ${roomId} }`);
    return false;
  }

  const userObjectId = new Types.ObjectId(userId);

  // Add user to the room if not already a member
  if (room.members.includes(userObjectId)) {
    console.info(`User joined room: { roomId: ${roomId}, userId: ${userId} }`);
    return true;
  }

  // Prevent joining if the room is private
  if (room.roomType === 'private') {
    console.info(
      `User cannot connect to private room: { roomId: ${roomId}, userId: ${userId} }`
    );
    return false;
  }

  // Add the user to the room's members list
  room.members.push(userObjectId);
  await room.save();

  console.info(`User joined room: { roomId: ${roomId}, userId: ${userId} }`);
  return true;
}

/**
 * Connects a user to a room if the user and room exist.
 * Validates the user and room, checks if the user is already connected,
 * and connects the user if not already a member.
 *
 * @param roomId - The ID of the room to connect the user to.
 * @param userId - The ID of the user to connect to the room.
 * @returns {Promise<boolean>} - Returns true if the user is successfully
 *                               connected or already connected, false otherwise.
 */
export async function connectMemberService(
  roomId: string,
  userId: string
): Promise<boolean> {
  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error('Invalid userId');
    return false;
  }

  // Convert userId to ObjectId
  const userObjectId = new mongoose.Types.ObjectId(userId);

  // Check if user exists
  const user = await User.findById(userObjectId);
  if (!user) {
    console.error(`User not found: { userId: ${userId} }`);
    return false;
  }

  // Check if room exists
  const room = await isValidRoomService(roomId);
  if (!room) {
    console.error(`Room not found: { roomId: ${roomId} }`);
    return false;
  }

  // Check if the user is already a member of the room
  const isUserInRoom = await Room.exists({ roomId, members: userObjectId });
  if (isUserInRoom) {
    console.info(
      `User already connected to room: { roomId: ${roomId}, userId: ${userId} }`
    );
    return true;
  }

  // If not already connected, delegate to the `joinMemberService` to add the user to the room
  return joinMemberService(roomId, userId);
}
