import { Outlet } from 'react-router-dom';

import useAuth from '../hooks/use-auth';

import { API_BASE_URL } from '../lib/constants';
import { Spinner } from './spinner';

export default function PrivateRoute() {
  const isAuth = useAuth();

  if (isAuth.isLoading) {
    return <Spinner />;
  }

  if (isAuth.account == null) {
    window.location.href = `${API_BASE_URL}/auth/google`;
    return null;
  }

  return <Outlet />;
}
