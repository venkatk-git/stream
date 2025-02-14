import React from 'react';

import { useSocketContext } from './socket-context-provider';

import { useNavigate, useParams } from 'react-router-dom';
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
   * Context
   */
  const { socket } = useSocketContext();

  /**
   * Hooks
   */
  const { roomId } = useParams();
  const navigator = useNavigate();

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
    /**
     * Handlers
     */
    const handleJoinError = () => {
      navigator('/not-found');
    };
    const handleJoinRoom = ({ name }: { name: string }) => {
      toast({
        title: 'New user connected',
        description: name,
        duration: 1000,
      });
    };
    const handleMembersList = (members: Member[]) => {
      setMembers(members);
    };

    /**
     * Join Room
     */
    socket.emit('room:join', { roomId });
    socket.on('room:join_error', handleJoinError);

    /**
     * After Joining Room
     */
    socket.on('room:joined', handleJoinRoom);
    socket.on('room:members_list', handleMembersList);

    /**
     * Clean up
     */
    return () => {
      socket.off('room:join_error', handleJoinError);
      socket.off('room:joined', handleJoinRoom);
      socket.off('room:members_list', handleMembersList);
    };
  }, [navigator, roomId, socket]);

  /**
   * For Video Queue State Changes
   */
  React.useEffect(() => {
    const handleAddVideoInQueue = (videoQueue: VideoQueue) => {
      setVideoQueue(videoQueue);
    };

    socket.on('video_queue:update', handleAddVideoInQueue);

    return () => {
      socket.off('video_queue:update', handleAddVideoInQueue);
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
