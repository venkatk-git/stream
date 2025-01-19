import React from 'react';

import { useSocketContext } from './socket-context-provider';

import { useParams } from 'react-router-dom';
import { toast } from '../hooks/use-toast';

import { Member, VideoQueue } from '../lib/types';

type RoomContextType = {
  roomId?: string;
  members: Member[];
  videoQueue: VideoQueue;
  handleAddVideoInQueue: (videoId: string) => void;
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
  const { socket } = useSocketContext();

  /**
   * States
   */
  const [members, setMembers] = React.useState<Member[]>([]);
  const [videoQueue, setVideoQueue] = React.useState<VideoQueue>([]);

  const handleAddVideoInQueue = (videoId: string) => {
    socket.emit('video_queue:add', videoId);
  };

  // For initial joining and loading
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

    return () => {
      socket.off('room:joined');
    };
  }, [roomId, socket]);

  /**
   * For Video Queue State Changes
   */
  React.useEffect(() => {
    socket.on('video_queue:update', (videoQueue: VideoQueue) => {
      setVideoQueue(videoQueue);
    });

    return () => {
      socket.off('video_queue:update');
    };
  }, [socket]);

  return (
    <RoomContext.Provider
      value={{ roomId, members, videoQueue, handleAddVideoInQueue }}
    >
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
