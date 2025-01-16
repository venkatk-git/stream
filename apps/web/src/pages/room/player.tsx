import ReactPlayer from 'react-player';

import { OnProgressProps } from 'react-player/base';

interface PlayerProps {
  videoId: string;
}

export default function Player({ videoId }: PlayerProps) {
  if (!videoId) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h1 className="text-lg text-red-700 font-medium">
          Add a video to watch
        </h1>
      </div>
    );
  }

  const handleSeek = (seconds: number) => {
    // console.log(`Seeked to ${seconds} seconds`);
  };

  const handleProgress = (obj: OnProgressProps) => {
    // console.log(obj);
  };

  return (
    <div className="p-1 w-full h-full flex items-center">
      <div className="w-full h-full rounded-md overflow-hidden">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          width={'100%'}
          height={'100%'}
          controls={true}
          onProgress={handleProgress}
          onSeek={handleSeek} // Handles user seek
          onPlay={() => console.log('Playing')}
        />
      </div>
    </div>
  );
}
