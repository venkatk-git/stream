import React from 'react';
import { useSocketContext } from './socket-context-provider';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';

type PlayerContextType = {
  playerRef: React.RefObject<ReactPlayer>;
  playing: boolean;
  duration: number;
  played: number;
  handleSetDuration: (duration: number) => void;
  handleSetSeeking: (isSeeking: boolean) => void;
  handleProgress: (state: OnProgressProps) => void;
  handleTriggerPlay: () => void;
  handleTriggerPause: () => void;
};

export const PlayerContext = React.createContext<PlayerContextType | null>(
  null
);

interface PlayerContextProvinderProps {
  children: React.ReactNode;
}

export default function PlayerContextProvinder({
  children,
}: PlayerContextProvinderProps) {
  // Context
  const { socket } = useSocketContext();

  /**
   * States
   */
  const [playing, setPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [seeking, setSeeking] = React.useState(false);
  const [played, setPlayed] = React.useState(0);

  const playerRef = React.useRef<ReactPlayer>(null);

  // Handlers for Setters
  const handleSetDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSetSeeking = (isSeeking: boolean) => {
    setSeeking(isSeeking);
  };

  const handleProgress = (state: OnProgressProps) => {
    if (!seeking) setPlayed(state.playedSeconds);
  };

  // Triggering Handlers
  const handleTriggerPlay = () => {
    socket.emit('video:play');
  };

  const handleTriggerPause = () => {
    socket.emit('video:pause');
  };

  // Listening Handlers
  const handleOnPlay = () => {
    setPlaying(true);
  };

  const handleOnPause = () => {
    setPlaying(false);
  };

  /**
   * Socket Event Handling
   */
  React.useEffect(() => {
    socket.on('video:play', () => {
      handleOnPlay();
      console.log('Play');
    });

    socket.on('video:pause', handleOnPause);
    // socket.on('video:seek', handleOnSeek);

    // Clean up
    return () => {
      socket.off('video:play', handleOnPlay);
      socket.off('video:pause', handleOnPause);
      //   socket.off('video:seek');
    };
  }, [socket]);

  return (
    <PlayerContext.Provider
      value={{
        playerRef,
        playing,
        duration,
        played,
        handleSetDuration,
        handleSetSeeking,
        handleProgress,
        handleTriggerPlay,
        handleTriggerPause,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  const context = React.useContext(PlayerContext);

  if (!context) {
    throw new Error(
      'Player Context can only be accessible inside Player Context Provider'
    );
  }

  return context;
}
