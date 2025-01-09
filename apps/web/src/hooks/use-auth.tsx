import React from 'react';
import { useAccountContext } from './use-context';

export default function useAuth() {
  const [isAuth, setIsAuth] = React.useState(false);

  const account = useAccountContext();

  if (account) {
    setIsAuth(true);
  }

  return { isAuth, setIsAuth };
}
