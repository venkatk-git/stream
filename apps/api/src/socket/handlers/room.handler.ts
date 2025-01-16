import { ExtendedSocket } from '../../lib/types';
import { getRoomMembers, joinMemberService } from '../../services/room.service';
import { emitError } from '../lib/utils';

// Define the joinHandler function
export async function joinHandler(socket: ExtendedSocket, roomId: string) {
  try {
    // Attempt to add the user as a member of the room
    const isMemberJoined = await joinMemberService(
      roomId,
      socket.request.session.user.id
    );

    // If the user is not added as a member, emit an error message
    if (!isMemberJoined) {
      socket.emit(
        'socket:error',
        'Failed to join the room. Please try again later.'
      );
      return false;
    }

    // If successful, join the room
    socket.join(roomId);
    socket.request.session.roomId = roomId;
    return true;
  } catch (error) {
    // If an error occurs, emit an error message
    socket.emit('socket:error', error.message);
    return false;
  }
}

export async function membersList(socket: ExtendedSocket) {
  const roomId = socket.request.session.roomId;

  if (!roomId) {
    emitError(socket, 'There is no roomId to send members list');
    return null;
  }

  // Fetch the members list
  const members_list = await getRoomMembers(roomId);

  return members_list;
}
