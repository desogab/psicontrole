import {
  Heading,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { schemaClientBasicInfo } from '../../models/yup/formSchema';
import { ClientInfo } from '../../types';

interface FormInputs {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  consultationPrice: number;
}

interface PersonalCardProps {
  client: ClientInfo | undefined;
}

export default function PersonalCard({ client }: PersonalCardProps) {
  const defaultValues = {
    name: client?.name,
    email: client?.email,
    phone: client?.phone,
    cpf: client?.cpf,
    consultationPrice: client?.consultationPrice,
  };

  const {
    register, handleSubmit, reset, formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: yupResolver(schemaClientBasicInfo),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (defaultValues !== undefined) reset(defaultValues);
  }, [client]);

  return (
    <Box p={4} borderRadius="2xl" boxShadow="base">
      <Heading as="h3" size="md" mb="2">Informações Básicas</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack mb="2" alignContent="flex-start" alignItems="flex-start">
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input id="name" type="text" {...register('name')} />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        <HStack mb="2">
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" {...register('email')} />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.phone}>
            <FormLabel htmlFor="phone">Telefone</FormLabel>
            <Input id="phone" type="tel" {...register('phone')} />
            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        <HStack mb="2">
          <FormControl isInvalid={!!errors.cpf}>
            <FormLabel htmlFor="cpf">CPF</FormLabel>
            <Input id="cpf" type="text" {...register('cpf')} />
            <FormErrorMessage>
              {errors.cpf && errors.cpf.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.consultationPrice}>
            <FormLabel htmlFor="consultationPrice">Valor Consulta</FormLabel>
            <Input id="consultationPrice" type="number" {...register('consultationPrice')} />
            <FormErrorMessage>
              {errors.consultationPrice && errors.consultationPrice.message}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        <Button type="submit" isLoading={isSubmitting}>Salvar</Button>
      </form>
    </Box>
  );
}
