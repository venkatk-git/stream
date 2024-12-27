import { v4 as uuidV4 } from 'uuid';
import mongoose from 'mongoose';

import Room from '../models/room.model';
import User from '../models/user.model';

export async function createRoom(ownerId: string) {
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
