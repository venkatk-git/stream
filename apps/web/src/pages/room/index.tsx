import React from 'react';
import { useParams } from 'react-router-dom';

import useSocket from '../../hooks/useSocket';
import Details from './details';
import { useRoomContext } from '../../contexts/room-context-provider';
import socket from '../socket';
import { useToast } from '../../hooks/use-toast';
import { title } from 'process';

export default function RoomPage() {
  /**
   * TODO:
   *  - Check wheather the recieved room id is valid --> Yes proceed, No Throw back
   *  - Render the video with the recieved video id
   *  - Make a an api call for members in the room
   *  -
   *
   */

  /**
   * Room page Initializer
   */
  const { toast } = useToast();
  const roomContext = useRoomContext();
  const { roomId } = useParams();

  useSocket();

  React.useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    if (!roomId) {
      /**
       * Throw back to Not Found page
       */
      return;
    }

    roomContext?.assignRoomId(roomId);
    socket.emit('room:join', { roomId });

    socket.on('room:joined', ({ name }: { name: string }) => {
      console.log('USER JOINED: ', name);
      toast({
        title: 'New user connected',
        description: name,
      });
    });

    return () => {
      socket.off('room:joined');
    };
  }, [roomContext, roomId, toast]);

  return (
    <section className="py-2 h-full w-full flex flex-col lg:flex-row gap-4">
      <div className="h-full w-full lg:flex-1 flex flex-col">
        <div className="h-full border border-gray-800 rounded-lg bg-gray-900">
          {/**
           * TODO: Insert the video
           */}
        </div>
      </div>
      <Details />
    </section>
  );
}
