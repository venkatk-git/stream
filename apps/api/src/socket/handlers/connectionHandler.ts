import { ExtendedSocket } from '../../lib/types';

function connectionHandler(socket: ExtendedSocket) {
  console.log(`New socket connection: ${socket.id} : ${socket.user.username}`);

  socket.emit('user:new', {
    message: `${socket.user.username} has joined`,
  });
}

export default connectionHandler;
