import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useClient } from '../../contexts/client/ClientContext';
import { schemaClientBasicInfo } from '../../models/yup/formSchema';
import { ClientInfo } from '../../types';

interface FormInputs {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  consultationPrice: number;
}

export function ClientCreate() {
  const navigate = useNavigate();
  const { createClient } = useClient();
  const {
    register, reset, handleSubmit, formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
      isSubmitted,
    },
  } = useForm<FormInputs>({
    resolver: yupResolver(schemaClientBasicInfo),
    defaultValues: {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      consultationPrice: 0,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    await createClient(data as ClientInfo);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        consultationPrice: 0,
        phone: '',
        email: '',
        cpf: '',
        name: '',
      });
    }
  }, [isSubmitted]);

  return (
    <Flex w="100%" direction="column">
      <Heading as="h1" mb="4">Novo Usuário</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={3}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel pl={2} htmlFor="name">Nome</FormLabel>
            <Input id="name" type="text" {...register('name')} />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.cpf}>
            <FormLabel pl={2} htmlFor="cpf">CPF</FormLabel>
            <Input id="cpf" type="text" {...register('cpf')} />
            <FormErrorMessage>
              {errors.cpf && errors.cpf.message}
            </FormErrorMessage>
          </FormControl>

          <HStack spacing={3}>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel pl={2} htmlFor="email">Email</FormLabel>
              <Input id="email" type="text" {...register('email')} />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.phone}>
              <FormLabel pl={2} htmlFor="phone">Contato</FormLabel>
              <Input id="phone" type="text" {...register('phone')} />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>

          <FormControl isInvalid={!!errors.consultationPrice}>
            <FormLabel pl={2} htmlFor="consultationPrice">Valor da Consulta</FormLabel>
            <Input id="consultationPrice" type="text" {...register('consultationPrice')} />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <HStack w="100%" justify="flex-end" alignItems="center">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Voltar
            </Button>
            <Button type="submit" isLoading={isSubmitting}>Cadastrar</Button>
          </HStack>
        </VStack>
      </form>
    </Flex>
  );
}
