import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/AuthContext';
import { Sidebar } from '../Sidebar';

export function Header() {
  const { logout } = useAuth();
  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      mx="auto"
      mt="4"
      px="6"
      align="center"
      justify="space-between"
    >
      <Sidebar />
      <HStack align="center">
        <IconButton
          aria-label="add new client"
          as={Link}
          to="#"
          borderRadius="full"
          variant="ghost"
        >
          <Icon
            _hover={{
              transition: ' 0.1s ease-in-out',
            }}
            w={5}
            h={5}
            as={FaUserPlus}
          />
        </IconButton>
        <Box>
          <Menu>
            <MenuButton as={Avatar} src="https://avatars.githubusercontent.com/u/62689439?v=4" />
            <MenuList>
              <MenuGroup title="Profile">
                <MenuItem>Perfil</MenuItem>
                <MenuItem onClick={logout}>Sair</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Help">
                <MenuItem>FAQ</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    </Flex>
  );
}
