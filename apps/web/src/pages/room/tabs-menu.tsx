import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';

export default function TabsMenu() {
  return (
    <Tabs defaultValue="members" className="w-full">
      <TabsList className="w-full flex gap-2 mb-2">
        <TabsTrigger
          value="members"
          className="p-1 data-[state=active]:bg-gray-800 flex-1 rounded-md"
        >
          Members
        </TabsTrigger>
        <TabsTrigger
          value="video_queue"
          className="p-1 data-[state=active]:bg-gray-800 flex-1 rounded-md"
        >
          Videos
        </TabsTrigger>
      </TabsList>
      <TabsContent value="members">Members</TabsContent>
      <TabsContent value="video_queue">Video Queue</TabsContent>
    </Tabs>
  );
}
