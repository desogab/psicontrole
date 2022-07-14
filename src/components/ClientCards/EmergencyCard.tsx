import {
  Box,
  Button,
  EditableInput,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { schemaClientEmergency } from '../../models/yup/formSchema';
import { ClientInfo } from '../../types';
import { EditableLayout } from '../EditableLayout/EditableLayout';

interface FormInputs {
  name: string;
  phone: string;
}

interface EmergencyCardProps {
  clientEmergency: ClientInfo['clientEmergency'] | undefined;
}

export function EmergencyCard({ clientEmergency }: EmergencyCardProps) {
  const defaultValues = {
    name: clientEmergency?.name,
    phone: clientEmergency?.phone,
  };

  const {
    register, reset, handleSubmit, formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: yupResolver(schemaClientEmergency),
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
  }, [clientEmergency]);

  return (
    <Box p={4} borderRadius="2xl" boxShadow="base">
      <Heading as="h2" size="lg" mb="2">Contato de Emergência</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>

        <HStack mb="2" alignContent="flex-start" alignItems="flex-start">

          <FormControl isInvalid={!!errors.name}>
            <FormLabel pl={2} fontWeight="bold" color="green.500" htmlFor="nameEmergency">Nome</FormLabel>
            <EditableLayout defaultValue={defaultValues.name}>
              <EditableInput id="nameEmergency" type="text" {...register('name')} />
            </EditableLayout>
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

        </HStack>

        <HStack mb="2">

          <FormControl isInvalid={!!errors.phone}>
            <FormLabel pl={2} fontWeight="bold" color="green.500" htmlFor="phoneEmergency">Telefone</FormLabel>
            <EditableLayout defaultValue={defaultValues.phone}>
              <EditableInput id="phoneEmergency" type="text" {...register('phone')} />
            </EditableLayout>
            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>

        </HStack>

        <Button type="submit" isLoading={isSubmitting}>Salvar</Button>
      </form>
    </Box>
  );
}
