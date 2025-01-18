import PlayerContextProvinder from '../../contexts/player-context-provider';
import { useRoomContext } from '../../contexts/room-context-provider';
import Details from './details';
import Player from './player';

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
  const { video } = useRoomContext();

  return (
    <section className="h-full w-full flex flex-col lg:flex-row gap-3">
      <div className="h-full w-full flex-1 flex flex-col">
        <div className="h-full border border-gray-800 rounded-lg bg-gray-900">
          {/**
           * TODO: Insert the video
           */}
          <PlayerContextProvinder>
            <Player videoId={video?.videoId || ''} />
          </PlayerContextProvinder>
        </div>
      </div>
      <div className="flex-1 lg:flex-none">
        <Details title={video?.title || ''} />
      </div>
    </section>
  );
}
