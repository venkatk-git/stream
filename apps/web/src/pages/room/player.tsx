import React from 'react';
import ReactPlayer from 'react-player';

import { usePlayerContext } from '../../contexts/player-context-provider';

import Duration from '../../components/duration';
import { Pause, Play } from 'lucide-react';

export default function Player() {
  const {
    video,
    playing,
    playerRef,
    timeStamp,
    handleSetDuration,
    handleProgress,
    handleTriggerPlay,
    handleTriggerPause,
  } = usePlayerContext();

  /**
   * !!!! Temporary Error Handling For In Case No `videoId` Provided
   */
  if (!video) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h1 className="text-lg text-red-700 font-medium">
          Add a video to watch
        </h1>
      </div>
    );
  }

  const handleOnLoadSeek = (timeStamp: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(timeStamp);
    }
    handleTriggerPause();
  };

  return (
    <div className="p-1 w-full h-full flex items-center">
      <div className="w-full h-full relative bottom-0 rounded-md overflow-hidden">
        <ReactPlayer
          ref={playerRef}
          url={`https://www.youtube.com/watch?v=${video.videoId}`}
          width={'100%'}
          height={'100%'}
          controls={false}
          playing={playing}
          onReady={() => handleOnLoadSeek(timeStamp)}
          onBuffer={() => console.log('Bufferring')}
          onBufferEnd={() => console.log('Buffer Ended')}
          onDuration={handleSetDuration}
          onProgress={handleProgress}
          onPlay={handleTriggerPlay}
          onPause={handleTriggerPause}
          onSeek={(e) => console.log('Seeking', e)}
        />
        <Controller />
      </div>
    </div>
  );
}

function Controller() {
  const {
    playerRef,
    duration,
    playing,
    played,
    handleSetSeeking,
    handleTriggerPlay,
    handleTriggerPause,
    handleTriggerSeek,
  } = usePlayerContext();

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (playerRef.current) {
      handleSetSeeking(false);
      const seekTo = parseFloat(e.target.value);
      handleTriggerSeek(seekTo);
    }
  };

  const handlePlayPause = () => {
    if (playing) {
      handleTriggerPause();
    } else {
      handleTriggerPlay();
    }
  };

  return (
    <div className="w-full p-3 pt-0 absolute flex flex-col bottom-0 left-0 backdrop-blur-md">
      <div className="w-full">
        <input
          type="range"
          className="h-[3px] w-full appearance-none range-thumb cursor-pointer bg-gray-800"
          min="0"
          max={duration} // Adjust based on video duration
          value={played}
          onMouseDown={() => handleSetSeeking(true)}
          onChange={handleSeek}
          step="0.1"
        />
      </div>
      <div className="h-10 flex items-center gap-3">
        <button className="appearance-none" onClick={handlePlayPause}>
          {playing ? (
            <Pause fill="white" className="border-0" />
          ) : (
            <Play fill="white" className="border-0" />
          )}
        </button>

        <ul className="appearance-none flex gap-1 text-sm font-semibold">
          <li>
            <Duration seconds={played} />
          </li>
          <li>/</li>
          <li>
            <Duration seconds={duration} />
          </li>
        </ul>
      </div>
    </div>
  );
}
