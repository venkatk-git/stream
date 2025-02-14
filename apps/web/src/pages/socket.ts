import io, { Socket } from 'socket.io-client';

const socket = io('http://localhost:8080', {
  autoConnect: false,
});

export default socket;