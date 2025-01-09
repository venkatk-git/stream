import { useContext } from 'react';
import { AccountContext } from '../contexts/account-context-provider';

export function useAccountContext() {
  const context = useContext(AccountContext);

  if (!context) {
    console.error(
      'Accont Context cannot be used outside of Accoun Context Provider'
    );
    return;
  }

  return context;
}
