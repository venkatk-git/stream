import { str10_36 } from 'hyperdyperid/lib/str10_36';
import mongoose, { Types } from 'mongoose';

import Room from '../models/room.model';
import User from '../models/user.model';
import Members from '../models/members.model';

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
export async function createRoom(ownerId: string): Promise<string | null> {
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

  const roomId = str10_36();

  const newRoom = new Room({
    roomId,
    ownerId,
    members: [ownerId],
  });

  const newMembersList = new Members({
    roomId,
    members: {
      name: owner.username,
      memberId: owner.id,
      profileImg: owner.profileImg,
    },
  });

  await newRoom.save();
  await newMembersList.save();

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
export async function isValidRoom(roomId: string): Promise<boolean> {
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
export async function joinMember(
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
  const isRoomValid = await isValidRoom(roomId);
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

  // Prevent joining if the room is private
  if (room.roomType === 'private') {
    console.info(
      `User cannot connect to private room: { roomId: ${roomId}, userId: ${userId} }`
    );
    return false;
  }

  const userObjectId = new Types.ObjectId(userId);

  // Add user to the room if not already a member
  if (room.members.includes(userObjectId)) {
    console.info(`User joined room: { roomId: ${roomId}, userId: ${userId} }`);
    return true;
  }

  // Add the user to the room's members list
  await Room.findOneAndUpdate(
    { roomId },
    { $addToSet: { members: userObjectId } } // Add only if the user is not already in the list
  );

  const membersList = await Members.findOneAndUpdate(
    { roomId },
    {
      $addToSet: {
        members: {
          name: user.username,
          memberId: user._id,
          profileImg: user.profileImg,
        },
      },
    }
  );

  if (!membersList) {
    console.error(`Failed to update members list for roomId: ${roomId}`);
    return false;
  }

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
export async function connectMember(
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
  const room = await isValidRoom(roomId);
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
  return joinMember(roomId, userId);
}

export async function getRoomMembersService(roomId: string) {
  try {
    if (!roomId) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    // Check if room exists
    const isRoomValid = await isValidRoom(roomId);
    if (!isRoomValid) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    const members_list = await Members.findOne({ roomId }).select('members');
    if (!members_list) {
      console.error(`Member list not found with room id : ${roomId}`);
      return null;
    }

    return members_list.members;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * !!! TEMPORARY SOLUTION FOR LOADING RECENT PLAYING VIDEO
 *
 * @param roomId
 * @returns
 */
export async function getVideo(roomId: string) {
  try {
    if (!roomId) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    // Check if room exists
    const isRoomValid = await isValidRoom(roomId);
    if (!isRoomValid) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    const room = await Room.findOne({ roomId });
    const videoQueue = room?.videoQueue;

    // console.log(videoQueue);

    if (!videoQueue || videoQueue.length === 0) return null;

    return videoQueue[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 *
 * @param roomId
 * @returns
 */
export async function getPlayingVideo(roomId: string) {
  try {
    if (!roomId) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    // Check if room exists
    const isRoomValid = await isValidRoom(roomId);
    if (!isRoomValid) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    const room = await Room.findOne({ roomId });

    if (room.videoQueue.length == 0) return null;

    const video = room.videoQueue.filter(
      (video) => video.videoId === room.playingVideo.videoId
    );

    return {
      videoId: video[0].videoId,
      timeStamp: room.playingVideo.timeStamp,
      title: video[0].title,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * 
 * 
 * @param roomId
 * @returns
 */
export async function handleRoomLock(roomId: string) {
  try {
    if (!roomId) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    // Check if room exists
    const isRoomValid = await isValidRoom(roomId);
    if (!isRoomValid) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    await Room.findOneAndUpdate(
      { roomId },
      { roomType: 'private' },
      { new: true }
    );
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @param roomId
 * @param played
 * @returns
 */
export async function handleRoomUnlock(roomId: string, played: number) {
  try {
    if (!roomId) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    // Check if room exists
    const isRoomValid = await isValidRoom(roomId);
    if (!isRoomValid) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    const room = await Room.findOne({ roomId });
    room.roomType = 'public';
    room.playingVideo.timeStamp = played;
    await room.save();
  } catch (error) {
    console.error(error);
  }
}
