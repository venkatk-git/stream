export default function ProfileIcon({ profileImg }: { profileImg: string }) {
  return (
    <span className="w-8 h-8 flex items-center justify-center rounded-full  bg-gray-700 overflow-hidden">
      <img
        src={profileImg}
        className="w-full h-full"
        alt="Profile"
        referrerPolicy="no-referrer"
      />
    </span>
  );
}
