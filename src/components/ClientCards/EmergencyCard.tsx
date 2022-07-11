import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { schemaClientEmergency } from '../../models/yup/formSchema';
import { ClientInfo } from '../../types';

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
    console.log(data);
  };

  useEffect(() => {
    if (defaultValues !== undefined) reset(defaultValues);
  }, [clientEmergency]);

  return (
    <Box p={4} borderRadius="2xl" boxShadow="base">
      <Heading as="h3" size="md" mb="2">Contato de Emergência</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack mb="2" alignContent="flex-start" alignItems="flex-start">
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input id="name" type="text" {...register('name')} />
          </FormControl>
        </HStack>
        <HStack mb="2">
          <FormControl isInvalid={!!errors.phone}>
            <FormLabel htmlFor="phone">Telefone</FormLabel>
            <Input id="phone" type="text" {...register('phone')} />
          </FormControl>
        </HStack>
      </form>
    </Box>
  );
}
