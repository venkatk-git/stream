import { cn } from '../../lib/utils';
import Details from './details';
import Player from './player';

export default function RoomPage() {
  return (
    <section
      className={cn(
        'h-full w-full gap-3',
        'flex flex-col',
        'lg:grid lg:grid-cols-7'
      )}
    >
      <div className="h-[300px] md:h-full col-span-5 flex flex-col">
        <div className="h-full border border-gray-800 rounded-lg bg-gray-900">
          <Player />
        </div>
      </div>
      <div className="col-span-2 h-[320px] md:h-full overflow-y-auto">
        <Details />
      </div>
    </section>
  );
}
