import React from 'react';
import useSocket from '../hooks/useSocket';
import socket from '../socket';
import { Socket } from 'socket.io-client';

type SocketContextValues = {
  socket: Socket;
};

export const SocketContext = React.createContext<SocketContextValues | null>(
  null
);

interface SocketContextProviderProps {
  children: React.ReactNode;
}
export default function SocketContextProvider({
  children,
}: SocketContextProviderProps) {
  useSocket();

  React.useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketContext() {
  const context = React.useContext(SocketContext);

  if (!context) {
    throw new Error(
      'Socket Context only available inside Socket Context Provider'
    );
  }

  return context;
}
