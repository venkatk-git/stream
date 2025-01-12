import useAuth from '../hooks/use-auth';
import { API_BASE_URL } from '../lib/constants';
import Button from './button';
import Filler from './filler';
import Logo from './logo';

export default function Header() {
  const isAuth = useAuth().account;

  return (
    <header className="flex h-12 items-center">
      <Logo />
      <Filler />
      <div className="">
        {isAuth ? (
          <ProfileIcon />
        ) : (
          <a href={`${API_BASE_URL}/auth/google`}>
            <Button>Login</Button>
          </a>
        )}
      </div>
    </header>
  );
}

function ProfileIcon() {
  return (
    <span className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-gray-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path
          fill="white"
          d="M15.71 12.71a6 6 0 1 0-7.42 0a10 10 0 0 0-6.22 8.18a1 1 0 0 0 2 .22a8 8 0 0 1 15.9 0a1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1a10 10 0 0 0-6.25-8.19M12 12a4 4 0 1 1 4-4a4 4 0 0 1-4 4"
        />
      </svg>
    </span>
  );
}
