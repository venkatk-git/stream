import TagLine from '../../components/tag-line';
import HomeRoomActions from './home-room-actions';

export function Home() {
  return (
    <div className="h-full w-full font-bold flex flex-col overflow-hidden">
      <div className="self-center mt-7">
        <TagLine>
          <a
            href="https://github.com/venkatk-git/stream"
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                />
              </svg>
              This is the github repository of Stream
            </div>
          </a>
        </TagLine>
      </div>
      <div className="h-24" />
      <main className="flex flex-col items-center overflow-auto size-full max-w-6xl mx-auto text-sm">
        <div className="my-7 flex flex-col gap-2">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-center font-semibold tracking-tight text-gray-200">
            Want to <span className="text-red-600 italic">watch</span> youtube{' '}
            <span className="text-red-600 italic">together?</span>
          </h1>
          <h3 className="text-sm md:text-lg lg:text-xl text-center font-semibold tracking-tight text-gray-300">
            Then create or join a room with your friends
          </h3>
        </div>
        <HomeRoomActions />
      </main>
    </div>
  );
}
