import { Outlet } from 'react-router-dom';

import useAuth from '../hooks/use-auth';

import { DEPLOYED_API_BASE_URL } from '../lib/constants';
import { Spinner } from './spinner';

export default function PrivateRoute() {
  const isAuth = useAuth();

  if (isAuth.isLoading) {
    return <Spinner />;
  }

  if (isAuth.account == null) {
    window.location.href = `${DEPLOYED_API_BASE_URL}/auth/google`;
    return null;
  }

  return <Outlet />;
}
