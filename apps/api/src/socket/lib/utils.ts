import { ExtendedSocket } from '../../lib/types';

export function emitError(socket: ExtendedSocket, error: string) {
  socket.emit('socket:error', {
    error,
  });
}
