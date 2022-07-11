import {
  Badge,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ClientSponsor {
  id: string;
  name: string;
  surname: string;
  cpf: string;
  createdAt: string;
  updatedAt: string | null;
}

interface ClientEmergency {
  id: string;
  name: string;
  surname: string;
  phone: string;
  createdAt: string;
  updatedAt: string | null;
}

interface ClientAddress {
  id: string;
  street: string;
  district: string;
  number: number;
  city: string;
  complement: string;
  state: string;
  zipcode: string;
  createdAt: string;
  updatedAt: string | null;
}

interface Client {
  id: string;
  active: boolean; // ok
  sponsor: boolean;
  name: string; // ok
  birthdate?: string | '';
  cpf: string; // ok
  email: string | ''; // ok
  phone: string; // ok
  consultationPrice: number; // ok
  createdAt: string;
  updatedAt: string | null;
  clientAddress: ClientAddress;
  clientEmergency: ClientEmergency;
  clientSponsor: ClientSponsor;
}

export function ClientById() {
  const { id } = useParams();
  const [client, setClient] = useState<Client>();

  useEffect(() => {
    (async () => {
      const dataClient = await fetch(`http://localhost:3001/clients/${id}`, { method: 'GET' }).then((response) => response.json());
      setClient(dataClient);
    })();
  }, [id]);

  return (
    <Flex w="100%" direction="column">
      <Flex alignItems="center">
        <Heading as="h1" mb="4">{client?.name}</Heading>
        <Spacer />
        {client?.active ? (
          <Badge variant="solid" colorScheme="green">ativo</Badge>
        ) : (
          <Badge variant="solid" colorScheme="red">inativo</Badge>
        )}

      </Flex>
      <SimpleGrid spacing={3}>
        <Box p={4} borderRadius="2xl" boxShadow="base">
          <Heading as="h3" size="md" mb="2">Informações Básicas</Heading>
          <HStack mb="2" alignContent="flex-start" alignItems="flex-start">
            <FormControl>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input id="name" type="text" />
            </FormControl>
          </HStack>
          <HStack mb="2">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone">Telefone</FormLabel>
              <Input id="phone" type="tel" />
            </FormControl>
          </HStack>
          <HStack mb="2">
            <FormControl>
              <FormLabel htmlFor="cpf">CPF</FormLabel>
              <Input id="cpf" type="text" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="consultationPrice">Valor Consulta</FormLabel>
              <Input id="consultationPrice" type="text" />
            </FormControl>
          </HStack>
        </Box>
        <Box p={4} borderRadius="2xl" boxShadow="base">
          <Flex alignItems="center">
            <Heading as="h3" size="md" mb="2">Endereço</Heading>
            <Spacer />
            <FormControl flex={1}>
              <Input placeholder="CEP" id="zipcode" type="text" />
            </FormControl>
          </Flex>
          <HStack mb="2" alignContent="flex-start" alignItems="flex-start">
            <FormControl>
              <FormLabel htmlFor="street">Rua</FormLabel>
              <Input id="street" type="text" />
            </FormControl>
          </HStack>
          <HStack mb="2">
            <FormControl>
              <FormLabel htmlFor="district">Bairro</FormLabel>
              <Input id="district" type="text" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="number">Número</FormLabel>
              <Input id="number" type="number" />
            </FormControl>
          </HStack>
          <HStack mb="2">
            <FormControl>
              <FormLabel htmlFor="city">Cidade</FormLabel>
              <Input id="city" type="text" />
            </FormControl>
          </HStack>
          <HStack>
            <FormControl>
              <FormLabel htmlFor="complement">Complemento</FormLabel>
              <Input id="complement" type="text" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="state">Estado</FormLabel>
              <Input id="state" type="text" />
            </FormControl>
          </HStack>
        </Box>
      </SimpleGrid>

    </Flex>
  );
}
