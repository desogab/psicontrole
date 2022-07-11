import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Client {
  id: string;
  active: boolean;
  sponsor: boolean;
  name: string;
  birthdate?: string | '';
  cpf: string;
  email: string | '';
  phone: string;
  consultationPrice: number;
  createdAt: string;
  updatedAt: string | null;
}

export function Client() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    (async () => {
      const clientList = await fetch('http://localhost:3001/clients', { method: 'GET' }).then((response) => response.json());

      // setTimeout(() => {
      setClients(clientList);
      // }, 3000);
    })();
  }, []);

  return (
    <Flex w="100%" direction="column">
      <Heading mb={2}>Clientes</Heading>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>CPF</Th>
              <Th>Contato</Th>
              <Th>Ativo?</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clients?.map((client) => (
              <Tr key={client.id}>
                <Td _hover={{ cursor: 'pointer' }}>
                  <Link to={`/clients/${client.id}`}>
                    {`${client.name}`}
                  </Link>
                </Td>
                <Td>{client.cpf}</Td>
                <Td>{client.phone}</Td>
                <Td>{client.active ? 'Ativo' : 'Inativo'}</Td>

              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Nome</Th>
              <Th>CPF</Th>
              <Th>Contato</Th>
              <Th>Ativo?</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Flex>
  );
}
