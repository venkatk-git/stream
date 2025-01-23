import { ExtendedSocket } from '../../lib/types';
import { getPlayingVideo, getVideo } from '../../services/room.service';
import { getVideoQueueService } from '../../services/video.service';

type VideoEvents = 'video:play' | 'video:pause' | 'video:seek';

/**
 * This function will handle events for the video player.
 *
 * @param socket
 * @param event
 * @param payload
 */
export function videoEventHandler(
  socket: ExtendedSocket,
  event: VideoEvents,
  payload: { videoId: string }
) {
  // Check if the user is in a room
  if (!socket.request.session.roomId) {
    socket.emit('socket:error', 'You are not in a room');
    socket.disconnect(true);
  }

  // Emit the play event to all users in the room
  socket.to(socket.request.session.roomId).emit(event, payload);
}

export async function loadVideoHandler(roomId: string) {
  const video = await getPlayingVideo(roomId);
  return video;
}

/**
 * Video Queue
 */
export async function loadVideoQueueHandler(roomId: string) {
  if (!roomId) {
    return;
  }

  const videoQueue = await getVideoQueueService(roomId);

  return videoQueue;
}
