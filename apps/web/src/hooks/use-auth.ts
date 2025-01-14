import { useAccountContext } from '../contexts/account-context-provider';

export default function useAuth() {
  const account = useAccountContext();

  if (account == null) {
    return { isLoading: true, account: null };
  }

  if (!account.isValid) {
    return { isLoading: false, account: account.account };
  }

  return { isLoading: false, account: account.account };
}
