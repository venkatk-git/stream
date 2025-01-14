import React from 'react';

type RoomContextType = {
  roomId: string;
  assignRoomId: (roomId: string) => void;
};

export const RoomContext = React.createContext<RoomContextType | null>(null);

export function useRoomContext() {
  const context = React.useContext(RoomContext);

  if (!context) {
    console.error(
      'Room Context can only be accessible inside Room Context Provider'
    );
  }

  return context;
}

interface RoomContextProviderProps {
  children: React.ReactNode;
}

export default function RoomContextProvider({
  children,
}: RoomContextProviderProps) {
  const [roomId, setRoomId] = React.useState('');

  const assignRoomId = (roomId: string) => {
    setRoomId(roomId);
  };

  return (
    <RoomContext.Provider value={{ roomId, assignRoomId }}>
      {children}
    </RoomContext.Provider>
  );
}
