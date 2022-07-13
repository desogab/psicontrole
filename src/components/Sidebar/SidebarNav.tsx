import {
  Box,
  Button,
  Icon,
  Text,
  VStack,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { FaUserFriends, FaRegChartBar } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useEffect, useRef } from 'react';

export function SidebarNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  return (
    <Box>
      <Button variant="unstyled" ref={btnRef} onClick={onOpen}>
        <HamburgerIcon w={6} h={6} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Text fontWeight="bold">
              Geral
            </Text>
            <VStack mt={2}>
              <Button as={Link} w="100%" to="#" leftIcon={<Icon as={FaRegChartBar} />}>Dashboard</Button>
              <Button as={Link} w="100%" to="/clients" leftIcon={<Icon as={FaUserFriends} />}>Clientes</Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
