import React from 'react';

import socket from '../socket';

export default function useSocket() {
  React.useEffect(() => {
    socket.connect();
    socket.on('connect_error', (error) => {
      console.log('Connection failed', error);
    });

    return () => {
      socket.off('connect_error');
    };
  }, []);
}
