import {
  Avatar, Flex, HStack, Icon, IconButton,
} from '@chakra-ui/react';
import { FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Sidebar } from '../Sidebar';

export function Header() {
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
          color="black"
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
        <Avatar src="https://avatars.githubusercontent.com/u/62689439?v=4" />
      </HStack>
    </Flex>
  );
}
