import { useContext } from 'react';
import { AccountContext } from '../contexts/account-context-provider';

export function useAccountContext() {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error(
      'Account Context cannot be used outside of Account Context Provider'
    );
  }

  return context;
}
