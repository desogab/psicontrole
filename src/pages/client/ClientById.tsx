import {
  Badge,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Switch,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddressCard } from '../../components/ClientCards/AddressCard';
import { EmergencyCard } from '../../components/ClientCards/EmergencyCard';
import PersonalCard from '../../components/ClientCards/PersonalCard';
import { useClient } from '../../contexts/client/ClientContext';
import { ClientInfo } from '../../types';

export function ClientById() {
  const { id } = useParams();
  const { getClientById } = useClient();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [client, setClient] = useState<ClientInfo>();
  const [isActive, setIsActive] = useState<ClientInfo['active']>(false);

  const cancelRef = useRef(null);

  async function toggleActive() {
    await fetch(`http://localhost:3001/clients/${id}`, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: 'PUT',
      body: JSON.stringify({
        ...client,
        active: !isActive,
      }),
    })
      .then((response) => {
        if (response.status === 200) setIsActive(!isActive);
      })
      .finally(() => onClose());
  }

  useEffect(() => {
    if (id !== undefined) {
      (async () => {
        const clientById = await getClientById(id);
        setClient(clientById);
        setIsActive(clientById.active);
      })();
    }
  }, [id, getClientById]);

  return (
    <Flex w="100%" direction="column">
      <Flex alignItems="center" mb="4">
        <Heading as="h1">{client?.name}</Heading>
        <Spacer />
        {/* {isActive ? ( */}
        {/*   <Badge variant="solid" colorScheme="green">ativo</Badge> */}
        {/* ) : ( */}
        {/*   <Badge variant="solid" colorScheme="red">inativo</Badge> */}
        {/* )} */}
        <Switch isChecked={isActive} colorScheme={isActive ? 'green' : 'gray'} onChange={onOpen} />
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
          size="sm"
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                {isActive ? 'Desativar Paciente' : 'Ativar Paciente'}
              </AlertDialogHeader>

              <AlertDialogBody>
                Tem certeza que deseja fazer isso?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  colorScheme={isActive ? 'red' : 'green'}
                  onClick={() => toggleActive()}
                  ml={3}
                >
                  {isActive ? 'Desativar' : 'Ativar'}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Flex>
      <SimpleGrid spacing={3}>
        {client && <PersonalCard client={client} />}
        {client?.clientAddress && <AddressCard clientAddress={client?.clientAddress} />}
        {client?.clientEmergency && <EmergencyCard clientEmergency={client?.clientEmergency} />}
      </SimpleGrid>

    </Flex>
  );
}
