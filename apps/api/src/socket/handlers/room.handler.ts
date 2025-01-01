import { ExtendedSocket } from '../../lib/types';
import { joinMemberService } from '../../services/room.service';

// Define the joinHandler function
export async function joinHandler(
  socket: ExtendedSocket,
  payload: { roomId: string }
) {
  try {
    const { roomId } = payload;

    // Attempt to add the user as a member of the room
    const isMemberJoined = await joinMemberService(
      roomId,
      socket.request.session.user.id
    );

    // If the user is not added as a member, emit an error message
    if (!isMemberJoined) {
      return socket.emit(
        'socket:error',
        'Failed to join the room. Please try again later.'
      );
    }

    // If successful, join the room
    socket.join(roomId);
    socket.request.session.roomId = roomId;
  } catch (error) {
    // If an error occurs, emit an error message
    socket.emit('socket:error', error.message);
  }
}
