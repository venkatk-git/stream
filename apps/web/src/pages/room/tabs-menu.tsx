import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';

export default function TabsMenu() {
  return (
    <Tabs defaultValue="members" className="w-full">
      <TabsList className="p-3 h-16 w-full flex gap-2 border-b border-gray-800">
        <TabsTrigger
          value="members"
          className="p-1 data-[state=active]:bg-red-700 flex-1 rounded-md font-semibold tracking-tight"
        >
          Members
        </TabsTrigger>
        <TabsTrigger
          value="video_queue"
          className="p-1 data-[state=active]:bg-red-700 flex-1 rounded-md font-semibold tracking-tight"
        >
          Videos
        </TabsTrigger>
      </TabsList>
      <TabsContent value="members">
        <MembersTab />
      </TabsContent>
      <TabsContent value="video_queue">Video Queue</TabsContent>
    </Tabs>
  );
}

function MembersTab() {
  const members = [
    { name: 'Alice Johnson', profile: 'Team Leader' },
    { name: 'Bob Smith', profile: 'Backend Developer' },
    { name: 'Charlie Davis', profile: 'Frontend Developer' },
    { name: 'Diana Martinez', profile: 'UI/UX Designer' },
  ];

  return (
    <div className="p-3 pt-0 flex flex-col">
      {members.map((member) => (
        <Member key={member.name}>{member.name}</Member>
      ))}
    </div>
  );
}

interface MemberProps {
  children: React.ReactNode;
}

function Member({ children }: MemberProps) {
  return (
    <div
      className="py-3 flex items-center gap-4 border-b border-gray-800
    "
    >
      <div className="h-8 w-8 rounded-full bg-gray-600" />
      <div>{children}</div>
    </div>
  );
}
