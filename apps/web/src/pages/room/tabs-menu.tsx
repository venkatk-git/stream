import { Tabs, TabsTrigger, TabsContent, TabsList } from '@radix-ui/react-tabs';
import VideoQueueTab from './video-queue-tab';
import MembersTab from './member-tab';

export default function TabsMenu() {
  return (
    <Tabs defaultValue="video_queue" className="h-full flex flex-col">
      {/* Tabs header */}
      <TabsList className="p-3 w-full flex gap-2 border-b border-gray-800">
        <TabsTrigger
          value="members"
          className="p-1 data-[state=active]:bg-red-700 border border-red-600 flex-1 rounded-md tracking-tight inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-all"
        >
          Members
        </TabsTrigger>
        <TabsTrigger
          value="video_queue"
          className="p-3 data-[state=active]:bg-red-700 border border-red-600 flex-1 rounded-md tracking-tight inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-all"
        >
          Videos
        </TabsTrigger>
      </TabsList>

      {/* Tabs content area (scrollable) */}
      <div className="flex-1 min-h-0 relative">
        <TabsContent
          value="members"
          className="absolute inset-0 overflow-y-auto"
        >
          <MembersTab />
        </TabsContent>
        <TabsContent
          value="video_queue"
          className="absolute inset-0 overflow-y-auto"
        >
          <VideoQueueTab />
        </TabsContent>
      </div>
    </Tabs>
  );
}
