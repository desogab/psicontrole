import {
  Badge,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddressCard } from '../../components/ClientCards/AddressCard';
import { EmergencyCard } from '../../components/ClientCards/EmergencyCard';
import PersonalCard from '../../components/ClientCards/PersonalCard';
import { useClient } from '../../contexts/client/ClientContext';
import { ClientInfo } from '../../types';

export function ClientById() {
  const { id } = useParams();
  const { getClientById } = useClient();
  const [client, setClient] = useState<ClientInfo>();

  useEffect(() => {
    if (id !== undefined) {
      (async () => {
        const clientById = await getClientById(id);
        setClient(clientById);
      })();
    }
  }, [id, getClientById]);

  return (
    <Flex w="100%" direction="column">
      <Flex alignItems="center" mb="4">
        <Heading as="h1">{client?.name}</Heading>
        <Spacer />
        {client?.active ? (
          <Badge variant="solid" colorScheme="green">ativo</Badge>
        ) : (
          <Badge variant="solid" colorScheme="red">inativo</Badge>
        )}

      </Flex>
      <SimpleGrid spacing={3}>
        <PersonalCard client={client} />
        {client?.clientAddress && <AddressCard clientAddress={client?.clientAddress} />}
        {client?.clientEmergency && <EmergencyCard clientEmergency={client?.clientEmergency} />}
      </SimpleGrid>

    </Flex>
  );
}
