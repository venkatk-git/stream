import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { useRoomContext } from '../../contexts/room-context-provider';

import { Plus } from 'lucide-react';
import ProfileIcon from '../../components/profile';

export default function TabsMenu() {
  return (
    <Tabs defaultValue="members" className="w-full">
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
      <TabsContent value="members">
        <MembersTab />
      </TabsContent>
      <TabsContent value="video_queue">
        <VideoQueueTab />
      </TabsContent>
    </Tabs>
  );
}

function MembersTab() {
  const { members } = useRoomContext();

  return (
    <div className="p-3 pt-0 flex flex-col">
      {members.map((member) => (
        <Member key={member.name} profileImg={member.profileImg}>
          {member.name}
        </Member>
      ))}
    </div>
  );
}

function VideoQueueTab() {
  return (
    <div className="p-3 pt-0 flex flex-col">
      <div className="mb-3">
        <Video>
          Full Video: MATTA | The Greatest Of All Time | Thalapathy Vijay |
          Venkat Prabhu |Yuvan Shankar Raja
        </Video>
      </div>
      <div className="h-10 p-0 m-0 rounded-sm flex items-center justify-center bg-red-700 font-medium text-xl">
        <Plus />
      </div>
    </div>
  );
}

interface MemberProps {
  children: string;
  profileImg: string;
}

function Member({ children, profileImg }: MemberProps) {
  return (
    <div
      className="py-3 flex items-center gap-4 border-b border-gray-800
    "
    >
      <ProfileIcon profileImg={profileImg} />
      <div className="truncate text-sm font-medium">{children}</div>
    </div>
  );
}

interface VideoProps {
  children: string;
}

function Video({ children }: VideoProps) {
  return (
    <div className="flex py-3 gap-2 border-b border-gray-800">
      <div className="aspect-video w-60 flex items-center rounded-sm border border-gray-800 bg-gray-700 overflow-hidden">
        <img
          src="https://i.ytimg.com/vi/IZHGcU0U_W0/default.jpg"
          alt="thumbnail"
        />
      </div>
      <p className="line-clamp-3 text-sm">{children}</p>
    </div>
  );
}
