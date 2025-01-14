import React from 'react';

import socket from '../socket';

export default function useSocket() {
  React.useEffect(() => {
    socket.connect();
    socket.on('connect_error', () => {
      console.log('Connection failed');
    });

    return () => {
      socket.off('connect_error');
    };
  }, []);
}
