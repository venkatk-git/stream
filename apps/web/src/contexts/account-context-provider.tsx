import React from 'react';

import useGetAccount from '../hooks/use-get-account';

import { AccountState } from '../lib/types';

export const AccountContext = React.createContext<AccountState | null>(null);

export function useAccountContext() {
  const context = React.useContext(AccountContext);

  /**
   * TODO: Make the context error handling better.
   */

  /**
   * TODO: Do delete this if statement and figure out another way to handle `Account Context cannot be used outside of Account Context Provider` error
   */
  if (context == null) {
    return context;
  }

  if (!context) {
    throw new Error(
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
    <AccountContext.Provider value={account}>
      {children}
    </AccountContext.Provider>
  );
}
