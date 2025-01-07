import React from 'react';

import socket from './socket';

export default function SocketIo() {
  useSocketSetup();

  React.useEffect(() => {
    socket.on('user:new', (payload) => {
      console.log(payload);
    });
  }, []);

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
