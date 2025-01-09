import React from 'react';
import axios from 'axios';

import { API_BASE_URL } from '../lib/constants';

type AccountContextType = {
  username: string;
  googleId: string;
  id: string;
};

type ApiResponse = {
  success: boolean;
  error: string | null;
  data: AccountContextType;
};

export const AccountContext = React.createContext<AccountContextType | null>(
  null
);

interface AccountContextProps {
  children: React.ReactNode;
}

export default function AccountContextProvider({
  children,
}: AccountContextProps) {
  const [account, setAccount] = React.useState<AccountContextType | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      console.log();
      try {
        const response: ApiResponse = await axios.get(`${API_BASE_URL}/auth`);
        if (!response.success) {
          return;
        }
        const data = response.data;
        setAccount(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [account]);

  return (
    <AccountContext.Provider value={account}>
      {children}
    </AccountContext.Provider>
  );
}
