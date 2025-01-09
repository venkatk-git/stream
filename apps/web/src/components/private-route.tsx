 import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/use-auth';

export default function PrivateRoute() {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="#" />;
}
