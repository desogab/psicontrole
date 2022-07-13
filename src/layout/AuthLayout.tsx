import { Flex } from '@chakra-ui/react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { useAuth } from '../contexts/auth/AuthContext';

export function AuthLayout() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my={6} maxW={1480} mx="auto" h="100vh" px={6}>
        <Outlet />
      </Flex>
    </Flex>
  );
}
