import PlayerContextProvinder from '../../contexts/player-context-provider';
import { useRoomContext } from '../../contexts/room-context-provider';
import { cn } from '../../lib/utils';
import Details from './details';
import Player from './player';

export default function RoomPage() {
  /**
   * Room page Initializer
   */
  const { video } = useRoomContext();

  return (
    <section
      className={cn(
        'h-full w-full gap-3',
        'flex flex-col',
        'md:grid grid-cols-7'
      )}
    >
      <div className="h-full col-span-5 flex flex-col">
        <div className="h-full border border-gray-800 rounded-lg bg-gray-900">
          {/**
           * TODO: Insert the video
           */}
          <PlayerContextProvinder>
            <Player videoId={video?.videoId || ''} />
          </PlayerContextProvinder>
        </div>
      </div>
      <div className="col-span-2">
        <Details title={video?.title || ''} />
      </div>
    </section>
  );
}
