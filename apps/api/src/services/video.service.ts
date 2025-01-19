import axios from 'axios';

import Room from '../models/room.model';

import { isValidRoomService } from './room.service';

export async function getVideoQueue(roomId: string) {
  try {
    if (!roomId) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    // Check if room exists
    const isRoomValid = await isValidRoomService(roomId);
    if (!isRoomValid) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    const video_queue = await Room.findOne({ roomId }).select('videoQueue');

    return video_queue.videoQueue;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function addVideoToQueue(roomId: string, videoId: string) {
  try {
    if (!roomId) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    // Check if room exists
    const isRoomValid = await isValidRoomService(roomId);
    if (!isRoomValid) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    const room = await Room.findOne({ roomId });

    const ytResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.GOOGLE_API_KEY}`
    );

    if (ytResponse.statusText != 'OK' || ytResponse.data.items.length == 0) {
      return null;
    }

    const title = ytResponse.data.items[0].snippet.title;
    const videoQueue = room?.videoQueue;
    videoQueue.push({
      id: videoId,
      title,
    });
    await room.save();

    return videoQueue;
  } catch (error) {
    console.error(error);
    return null;
  }
}
