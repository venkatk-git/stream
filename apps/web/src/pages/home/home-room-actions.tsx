import useAuth from '../../hooks/use-auth';
import JoinRoomForm from './join-room-form';

export default function HomeRoomActions() {
  const isAuth = useAuth().account;

  return (
    <div className="flex flex-col gap-3 ">
      <div className="h-12 w-full md:w-96">
        <button
          disabled={!isAuth}
          onClick={() =>
            window.location.replace('http://localhost:4200/r/something')
          }
          className={`h-full w-full transition bg-red-600 hover:bg-red-500 text-gray-200 text-sm px-4 py-1.5 rounded-md outline-accent-500 border border-red-500 ${
            isAuth ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
        >
          Create Instant Room
        </button>
      </div>
      <div className="w-full border-t border-gray-700" />
      <JoinRoomForm isDisabled={!isAuth} />
    </div>
  );
}
