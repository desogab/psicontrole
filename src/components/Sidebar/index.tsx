import { Box } from '@chakra-ui/react';
import { SidebarNav } from './SidebarNav';

export function Sidebar() {
  return (
    <Box as="aside" maxW={64}>
      <SidebarNav />
    </Box>
  );
}
