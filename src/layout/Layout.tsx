import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';

export function Layout() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my={6} maxW={1480} mx="auto" h="100vh" px={6}>
        <Outlet />
      </Flex>
    </Flex>
  );
}
