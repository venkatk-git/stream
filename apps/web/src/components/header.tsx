import { useAccountContext } from '../contexts/account-context-provider';

import useAuth from '../hooks/use-auth';

import Button from './button';
import Filler from './filler';
import Logo from './logo';
import ProfileIcon from './profile';

import { API_BASE_URL } from '../lib/constants';

export default function Header() {
  const isAuth = useAuth().account;
  const profileImg = useAccountContext()?.account?.profileImg || '';

  return (
    <header className="flex h-12 items-center">
      <Logo />
      <Filler />
      <div className="">
        {isAuth ? (
          <ProfileIcon profileImg={profileImg} />
        ) : (
          <a href={`${API_BASE_URL}/auth/google`}>
            <Button>Login</Button>
          </a>
        )}
      </div>
    </header>
  );
}
