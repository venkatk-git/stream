import React from 'react';

import useGetAccount from '../hooks/use-get-account';

import { UserData } from '../lib/types';

export type AccountContextType = {
  user: UserData | null;
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
  const account = useGetAccount();

  return (
    <AccountContext.Provider value={{ user: account }}>
      {children}
    </AccountContext.Provider>
  );
}
