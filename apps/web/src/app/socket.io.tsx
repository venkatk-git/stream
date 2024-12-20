import React from 'react';

import socket from './socket';

export default function SocketIo() {
  useSocketSetup();
  return <div>socket.io</div>;
}

function useSocketSetup() {
  React.useEffect(() => {
    socket.connect();
    socket.on('connect_error', () => {
      console.error('Oops! There is a problem in react socket connection :(');
    });
  }, []);
}
