import React from 'react';

import { useAccountContext } from '../contexts/account-context-provider';

export default function useAuth() {
  const [isAuth, setIsAuth] = React.useState(false);
  const account = useAccountContext();

  React.useEffect(() => {
    if (account) {
      if (account.isLoading) {
        // Show loading state or do something if the account is still loading
      } else {
        setIsAuth(true); // Account data is loaded, set isAuth to true
      }
    } else {
      setIsAuth(false); // No account context available, set isAuth to false
    }
  }, [account]);

  return { isAuth, setIsAuth };
}
