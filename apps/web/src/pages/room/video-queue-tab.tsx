import React from 'react';

import { cn, extractVideoIdFromUrl } from '../../lib/utils';

import { useRoomContext } from '../../contexts/room-context-provider';
import { usePlayerContext } from '../../contexts/player-context-provider';

import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from '../../components/dialog';

import { Video } from '../../lib/types';

export default function VideoQueueTab() {
  /**
   * Context
   */
  const { videoQueue, handleAddVideoInQueue } = useRoomContext();
  const { video, handleTriggerLoadVideo } = usePlayerContext();

  /**
   * States
   */
  const [url, setUrl] = React.useState('');

  /**
   * Handlers
   */
  const handleOnAddVideoInQueue = (url: string) => {
    const videoId = extractVideoIdFromUrl(url);
    if (!videoId) return;
    handleAddVideoInQueue(videoId);
  };
  const handleVideoQueueOnClick = (video: Video | null) => {
    if (!video) return;

    handleTriggerLoadVideo({
      videoId: video.videoId,
      title: video.title,
    });
  };

  /**
   * Component
   */
  return (
    <div className="h-full p-3 pt-0 flex flex-col overflow-y-auto">
      <div className="mb-3 -mx-3">
        {videoQueue?.map((_video) => (
          <button
            className={cn(
              'appearance-none px-3 text-left hover:bg-red-700/50 hover:text-gray-200 text-gray-200/50 transition',
              video && video.videoId === _video.videoId ? 'text-gray-200' : ''
            )}
            key={_video.videoId}
            onClick={() => handleVideoQueueOnClick(_video)}
          >
            <VideoCard videoId={_video.videoId}>{_video.title}</VideoCard>
          </button>
        ))}
      </div>
      <Dialog>
        <DialogTrigger className="w-full appearance-none p-2 rounded-md flex items-center justify-center bg-red-700 hover:bg-red-600 font-medium text-sm transition border border-red-600">
          Add
        </DialogTrigger>
        <DialogContent className="bg-black-300 border-gray-800 text-gray-200">
          <DialogHeader>
            <DialogDescription className="font-medium text-sm">
              Paste your youtube video link.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <label htmlFor="link" className="sr-only">
                Link
              </label>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={`h-8 w-full px-2 py-1.5 text-sm border rounded-sm focus:outline-none font-normal bg-black-300 text-gray-200 border-gray-800 placeholder-gray-500`}
                placeholder="https://youtube.com/watch?v=example"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button
                onClick={() => handleOnAddVideoInQueue(url)}
                className="bg-red-700 hover:bg-red-600 transition text-gray-200 text-xs px-4 py-1.5 rounded-md outline-accent-500 border border-red-500"
              >
                Add
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface VideoProps {
  videoId: string;
  children: string;
}

function VideoCard({ videoId, children }: VideoProps) {
  return (
    <div className="h-24 grid grid-cols-7 place-items-center py-3 gap-2 border-b border-gray-800">
      <div className="col-span-2 rounded-sm border border-gray-800 bg-gray-700 overflow-hidden">
        <img
          src={`https://i.ytimg.com/vi/${videoId}/default.jpg`}
          srcSet={`https://i.ytimg.com/vi/${videoId}/default.jpg, https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}
          alt="thumbnail"
          className="h-full w-full"
        />
      </div>
      <p className={cn('col-span-5 line-clamp-3 text-sm')}>{children}</p>
    </div>
  );
}
