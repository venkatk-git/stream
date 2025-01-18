import { Tabs, TabsTrigger, TabsContent, TabsList } from '@radix-ui/react-tabs';
import VideoQueueTab from './video-queue-tab';
import MembersTab from './member-tab';

export default function TabsMenu() {
  return (
    <Tabs defaultValue="video_queue" className="w-full h-full flex flex-col">
      <TabsList className="p-3 h-16 w-full flex gap-2 border-b border-gray-800">
        <TabsTrigger
          value="members"
          className="p-1 data-[state=active]:bg-red-700 border border-red-600 flex-1 rounded-md tracking-tight inline-flex items-center justify-center whitespace-nowrap  px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          Members
        </TabsTrigger>
        <TabsTrigger
          value="video_queue"
          className="p-1 data-[state=active]:bg-red-700 border border-red-600 flex-1 rounded-md tracking-tight inline-flex items-center justify-center whitespace-nowrap  px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          Videos
        </TabsTrigger>
      </TabsList>
      <div className="h-full overflow-y-auto">
        <TabsContent value="members">
          <MembersTab />
        </TabsContent>
        <TabsContent value="video_queue">
          <VideoQueueTab />
        </TabsContent>
      </div>
    </Tabs>
  );
}
