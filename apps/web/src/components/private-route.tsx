import { Outlet } from 'react-router-dom';

import useAuth from '../hooks/use-auth';

import { API_BASE_URL } from '../lib/constants';

export default function PrivateRoute() {
  const { isAuth } = useAuth();

  if (!isAuth) {
    window.location.href = `${API_BASE_URL}/auth/google`;
    return null;
  }

  return <Outlet />;
}
