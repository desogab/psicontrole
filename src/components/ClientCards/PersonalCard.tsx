import {
  Heading,
  HStack,
  FormControl,
  FormLabel,
  Box,
  Button,
  FormErrorMessage,
  EditableInput,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { schemaClientBasicInfo } from '../../models/yup/formSchema';
import { ClientInfo } from '../../types';
import { EditableLayout } from '../EditableLayout/EditableLayout';

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
    const response = new Promise<void>((resolve) => {
      setTimeout(() => {
        // eslint-disable-next-line no-alert
        alert(JSON.stringify(data, null, 2));
        resolve();
      }, 1500);
    });
    return response;
  };

  useEffect(() => {
    reset(defaultValues);
  }, [client]);

  return (
    <Box p={4} borderRadius="2xl" boxShadow="base">
      <Heading pl={2} as="h3" size="md" mb="2">Informações Básicas</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>

        <HStack mb="2">

          <FormControl isInvalid={!!errors.name}>
            <FormLabel pl={2} htmlFor="name">Nome</FormLabel>
            <EditableLayout defaultValue={defaultValues.name}>
              <EditableInput id="name" type="text" {...register('name')} />
            </EditableLayout>
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

        </HStack>

        <HStack mb="2">

          <FormControl isInvalid={!!errors.email}>
            <FormLabel pl={2} htmlFor="email">Email</FormLabel>
            <EditableLayout defaultValue={defaultValues.email}>
              <EditableInput id="email" type="email" {...register('email')} />
            </EditableLayout>
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.phone}>
            <FormLabel pl={2} htmlFor="phone">Telefone</FormLabel>
            <EditableLayout defaultValue={defaultValues.phone}>
              <EditableInput id="phone" type="tel" {...register('phone')} />
            </EditableLayout>
            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>

        </HStack>

        <HStack mb="2">

          <FormControl isInvalid={!!errors.cpf}>
            <FormLabel pl={2} htmlFor="cpf">CPF</FormLabel>
            <EditableLayout defaultValue={defaultValues.cpf}>
              <EditableInput id="cpf" type="text" {...register('cpf')} />
            </EditableLayout>
            <FormErrorMessage>
              {errors.cpf && errors.cpf.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.consultationPrice}>
            <FormLabel pl={2} htmlFor="consultationPrice">Valor Consulta</FormLabel>
            <EditableLayout defaultValue={defaultValues.consultationPrice as any}>
              <EditableInput id="consultationPrice" type="number" {...register('consultationPrice')} />
            </EditableLayout>
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
