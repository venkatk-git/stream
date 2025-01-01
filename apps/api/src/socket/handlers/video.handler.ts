import { ExtendedSocket } from '../../lib/types';

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
