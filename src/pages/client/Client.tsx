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
import { Link } from 'react-router-dom';
import { useClient } from '../../contexts/client/ClientContext';

export function Client() {
  const { clients } = useClient();

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
