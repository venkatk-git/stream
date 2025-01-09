import React from 'react';
import axios from 'axios';

import { API_BASE_URL } from '../lib/constants';

type UserData = {
  username: string;
  googleId: string;
  id: string;
};

type AccountContextType = {
  isLoading: boolean;
  user: UserData | null;
};

type ApiResponse = {
  success: boolean;
  error: string | null;
  data: UserData;
};

export const AccountContext = React.createContext<AccountContextType | null>(
  null
);

export function useAccountContext() {
  const context = React.useContext(AccountContext);

  if (!context) {
    console.error(
      'Account Context cannot be used outside of Account Context Provider'
    );
  }

  return context;
}

interface AccountContextProps {
  children: React.ReactNode;
}

export default function AccountContextProvider({
  children,
}: AccountContextProps) {
  const [account, setAccount] = React.useState<AccountContextType>({
    isLoading: false,
    user: null,
  });

  React.useEffect(() => {
    async function fetchData() {
      try {
        setAccount((prev) => ({ ...prev, isLoading: true }));
        const response: ApiResponse = await axios.get(
          `${API_BASE_URL}/reqAuth`,
          {
            withCredentials: true,
          }
        );

        const data = response.data;
        setAccount((prev) => ({ ...prev, user: data }));
      } catch (error) {
        console.error(error);
      } finally {
        setAccount((prev) => ({ ...prev, isLoading: false }));
      }
    }
    fetchData();
  }, []);

  return (
    <AccountContext.Provider value={account}>
      {children}
    </AccountContext.Provider>
  );
}
