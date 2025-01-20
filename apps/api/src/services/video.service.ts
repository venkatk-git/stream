import axios from 'axios';

import Room from '../models/room.model';

import { isValidRoomService } from './room.service';

/**
 * Retrieves the video queue for a specific room.
 *
 * @param roomId - The unique identifier of the room.
 * @returns The video queue of the room if it exists, otherwise `null`.
 */
export async function getVideoQueueService(roomId: string) {
  try {
    // Validate the input parameter
    if (!roomId) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    // Check if the room exists by validating its ID
    const isRoomValid = await isValidRoomService(roomId);
    if (!isRoomValid) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    // Retrieve the video queue for the room from the database
    const video_queue = await Room.findOne({ roomId }).select('videoQueue');

    // Return the video queue
    return video_queue.videoQueue;
  } catch (error) {
    // Log and handle any errors that occur during execution
    console.error(error);
    return null;
  }
}

/**
 * Adds a video to the video queue of a specific room.
 *
 * @param roomId - The unique identifier of the room.
 * @param videoId - The unique identifier of the YouTube video to be added.
 * @returns The updated video queue if successful, otherwise `null`.
 */
export async function addVideoToQueueService(roomId: string, videoId: string) {
  try {
    // Validate the roomId parameter
    if (!roomId) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    // Check if the room exists by validating its ID
    const isRoomValid = await isValidRoomService(roomId);
    if (!isRoomValid) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    // Retrieve the room from the database
    const room = await Room.findOne({ roomId });

    // Fetch video details from the YouTube API using the provided videoId
    const ytResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.GOOGLE_API_KEY}`
    );

    // Check if the response from the YouTube API is valid and contains video details
    if (ytResponse.statusText != 'OK' || ytResponse.data.items.length == 0) {
      return null;
    }

    // Extract the video title from the YouTube API response
    const title = ytResponse.data.items[0].snippet.title;

    // Add the video details to the room's video queue
    const videoQueue = room?.videoQueue;
    videoQueue.push({
      videoId,
      title,
    });

    // Save the updated room information in the database
    await room.save();

    // Return the updated video queue
    return videoQueue;
  } catch (error) {
    // Log and handle any errors that occur during execution
    console.error(error);
    return null;
  }
}

export async function updatePlayingVideoService(
  roomId: string,
  videoId: string
) {
  try {
    // Validate the roomId parameter
    if (!roomId) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    // Check if the room exists by validating its ID
    const isRoomValid = await isValidRoomService(roomId);
    if (!isRoomValid) {
      console.error(`Room not found: { roomId: ${roomId} }`);
      return null;
    }

    // Retrieve the room from the database
    const room = await Room.findOne({ roomId });

    // Add the video details to the room's video queue
    const videoQueue = room?.videoQueue;

    /**
     * Updating playing video
     */
    room.playingVideo = {
      videoId,
      timeStamp: 0,
    };

    // Save the updated room information in the database
    await room.save();

    // Return the updated video queue
    return videoQueue;
  } catch (error) {
    // Log and handle any errors that occur during execution
    console.error(error);
    return null;
  }
}
