import React from 'react';

import { useSocketContext } from './socket-context-provider';

import { useNavigate, useParams } from 'react-router-dom';
import { toast } from '../hooks/use-toast';

import { Member } from '../lib/types';

type RoomContextType = {
  roomId?: string;
  members: Member[];
  videoId: string | null;
};

export const RoomContext = React.createContext<RoomContextType | null>(null);

interface RoomContextProviderProps {
  children: React.ReactNode;
}

export default function RoomContextProvider({
  children,
}: RoomContextProviderProps) {
  /**
   * Hooks
   */
  const { roomId } = useParams();
  const navigator = useNavigate();
  const { socket } = useSocketContext();

  /**
   * States
   */
  const [members, setMembers] = React.useState<Member[]>([]);
  const [videoId, setVideo] = React.useState<string | null>(null);

  React.useEffect(() => {
    // After Join
    socket.emit('room:join', { roomId });

    socket.on('room:joined', ({ name }: { name: string }) => {
      toast({
        title: 'New user connected',
        description: name,
      });
    });

    socket.on('room:members_list', (members) => {
      setMembers(members);
    });

    socket.on('video:load', (videoId) => {
      setVideo(videoId);
    });

    return () => {
      socket.off('room:joined');
    };
  }, [roomId, socket]);

  return (
    <RoomContext.Provider value={{ roomId, members, videoId }}>
      {children}
    </RoomContext.Provider>
  );
}

export function useRoomContext() {
  const context = React.useContext(RoomContext);

  if (!context) {
    throw new Error(
      'Room Context can only be accessible inside Room Context Provider'
    );
  }

  return context;
}
