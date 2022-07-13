import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/auth/AuthContext';

export function HomeLayout() {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    <Navigate to="/clients" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
