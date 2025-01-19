import ProfileIcon from '../../components/profile';
import { useRoomContext } from '../../contexts/room-context-provider';

export default function MembersTab() {
  const { members } = useRoomContext();

  return (
    <div className="h-full p-3 pt-0 flex flex-col overflow-y-auto">
      {members.map((member) => (
        <Member key={member.name} profileImg={member.profileImg}>
          {member.name}
        </Member>
      ))}
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
