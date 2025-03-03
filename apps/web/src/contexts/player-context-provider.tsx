import React from 'react';
import { useSocketContext } from './socket-context-provider';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';
import { useToast } from '../hooks/use-toast';
import { LoadVideo, Video, Event } from '../lib/types';
import { CONTROLLS_ALIVE_INTERVAL } from '../lib/constants';

type PlayerContextType = {
  video: Video | null;
  playerRef: React.RefObject<ReactPlayer>;
  playing: boolean;
  duration: number;
  played: number;
  timeStamp: number;
  timer: number;
  showControls: boolean;
  handleSetDuration: (duration: number) => void;
  handleSetSeeking: (isSeeking: boolean) => void;
  handleProgress: (state: OnProgressProps) => void;
  handleTriggerPlay: () => void;
  handleTriggerPause: () => void;
  handleTriggerSeek: (seekTo: number) => void;
  handleTriggerLoadVideo: (video: Video) => void;
  handleTriggerVideoBuffer: () => void;
  handleShowControls: (showControls: boolean) => void;
  handleSetTimer: (timer: number) => void;
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
  /**
   * Context
   */
  const { socket } = useSocketContext();

  /**
   * Hooks
   */
  const { toast } = useToast();

  /**
   * States
   */
  const [video, setVideo] = React.useState<LoadVideo | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [seeking, setSeeking] = React.useState(false);
  const [played, setPlayed] = React.useState(0);
  const [timeStamp, setTimeStamp] = React.useState(0);
  const [showControls, setShowControls] = React.useState(true);
  const [timer, setTimer] = React.useState(CONTROLLS_ALIVE_INTERVAL);

  /**
   * Ref
   */
  const playerRef = React.useRef<ReactPlayer>(null);

  /**
   * Handlers for Setters
   */
  const handleSetDuration = (duration: number) => {
    setDuration(duration);
  };
  const handleSetSeeking = (isSeeking: boolean) => {
    setSeeking(isSeeking);
  };
  const handleProgress = (state: OnProgressProps) => {
    if (!seeking) setPlayed(state.playedSeconds);
  };

  const handleShowControls = (showControls: boolean) => {
    setShowControls(showControls);
  };
  const handleSetTimer = (timer: number) => {
    setTimer(timer);
  };

  /**
   * Sepical Room Handlers
   */
  React.useEffect(() => {
    if (playing) {
      socket.emit('room:lock');
    } else {
      socket.emit('room:unlock', played);
    }
  }, [played, playing, socket]);

  /**
   * Triggering Handlers
   */
  const handleTriggerPlay = () => {
    socket.emit('video:play');
  };
  const handleTriggerPause = () => {
    socket.emit('video:pause');
  };
  const handleTriggerSeek = (seekTo: number) => {
    socket.emit('video:seek', seekTo);
  };
  const handleTriggerLoadVideo = (video: Video) => {
    socket.emit('video:load', video);
  };
  const handleTriggerVideoBuffer = () => {
    socket.emit('video:buffering');
  };

  /**
   * Socket Event Handling
   */
  React.useEffect(() => {
    /**
     * Listening Handlers
     */
    const handleOnPlay = (intiator: string) => {
      console.log(`${intiator} has played`);
      setPlaying(true);
    };
    const handleOnPause = (intiator: string) => {
      console.log(`${intiator} has paused`);
      setPlaying(false);
    };
    const handleOnSeek = ({
      seekTo,
      intiator,
    }: {
      seekTo: number;
      intiator: string;
    }) => {
      console.log(`${intiator} has seeked`);
      playerRef.current?.seekTo(seekTo);
    };
    const handleOnLoadVideo = (video: LoadVideo) => {
      setVideo(video);
      setTimeStamp(video.timeStamp);
    };

    const handleOnVideoBuffer = (intiator) => {
      toast({
        title: 'Buffering :)',
        description: `${intiator} experiencing buffering`,
        duration: 500,
      });
    };

    socket.on('video:load', handleOnLoadVideo);
    socket.on('video:play', handleOnPlay);
    socket.on('video:pause', handleOnPause);
    socket.on('video:seek', handleOnSeek);
    socket.on('video:buffering', handleOnVideoBuffer);

    // Clean up
    return () => {
      socket.off('video:load', handleOnLoadVideo);
      socket.off('video:play', handleOnPlay);
      socket.off('video:pause', handleOnPause);
      socket.off('video:seek', handleOnSeek);
      socket.off('video:buffering', handleOnVideoBuffer);
    };
  }, [socket, toast]);

  /**
   * Handle hiding controllers
   */
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showControls) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer <= 0) setShowControls(false);
    if (timer > 0) setShowControls(true);

    return () => clearInterval(interval);
  }, [showControls, timer]);

  return (
    <PlayerContext.Provider
      value={{
        video,
        playerRef,
        playing,
        duration,
        played,
        timeStamp,
        timer,
        showControls,
        handleSetDuration,
        handleSetSeeking,
        handleProgress,
        handleTriggerPlay,
        handleTriggerPause,
        handleTriggerSeek,
        handleTriggerLoadVideo,
        handleTriggerVideoBuffer,
        handleShowControls,
        handleSetTimer,
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
