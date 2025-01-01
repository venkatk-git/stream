import { ExtendedSocket } from '../../lib/types';

/**
 * Handles a new socket connection.
 *
 * This function is called whenever a new socket connection is established.
 *
 * @param socket - The new socket connection.
 */
function connectionHandler(socket: ExtendedSocket) {
  console.log(`New socket connection: ${socket.id} : ${socket.user.username}`);

  socket.emit('user:new', {
    message: `${socket.user.username} has joined`,
  });
}

export default connectionHandler;
