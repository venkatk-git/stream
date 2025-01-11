import { useAccountContext } from '../contexts/account-context-provider';

export default function useAuth() {
  const account = useAccountContext();

  return account && account.user;
}
