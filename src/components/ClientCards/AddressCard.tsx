import {
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Box,
  FormErrorMessage,
  Button,
  EditableInput,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { schemaClientAddress } from '../../models/yup/formSchema';
import { ClientInfo } from '../../types';
import { EditableLayout } from '../EditableLayout/EditableLayout';

interface FormInputs {
  zipcode: string;
  street: string;
  district: string;
  number: number;
  city: string;
  complement: string;
  state: string;
}

interface AddressCardProps {
  clientAddress: ClientInfo['clientAddress'] | undefined;
}

export function AddressCard({ clientAddress }: AddressCardProps) {
  const defaultValues = {
    zipcode: clientAddress?.zipcode,
    street: clientAddress?.street,
    district: clientAddress?.district,
    number: clientAddress?.number,
    city: clientAddress?.city,
    complement: clientAddress?.complement,
    state: clientAddress?.state,
  };

  const {
    register, reset, handleSubmit, formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: yupResolver(schemaClientAddress),
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
  }, [clientAddress]);

  return (

    <Box p={4} borderRadius="2xl" boxShadow="base">
      <Heading as="h2" size="lg" mb="2">Endereço</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>

        <VStack mb="2" alignContent="flex-start" alignItems="flex-start">

          <FormControl isInvalid={!!errors.zipcode}>
            <FormLabel pl={2} fontWeight="bold" color="green.500" htmlFor="zipcode">CEP</FormLabel>
            <EditableLayout defaultValue={defaultValues.zipcode}>
              <EditableInput w="50%" id="zipcode" type="text" {...register('zipcode')} />
            </EditableLayout>
            <FormErrorMessage>
              {errors.zipcode && errors.zipcode.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.street}>
            <FormLabel pl={2} fontWeight="bold" color="green.500" htmlFor="street">Rua</FormLabel>
            <EditableLayout defaultValue={defaultValues.street}>
              <EditableInput id="street" type="text" {...register('street')} />
            </EditableLayout>
            <FormErrorMessage>
              {errors.street && errors.street.message}
            </FormErrorMessage>
          </FormControl>

        </VStack>

        <HStack mb="2">
          <FormControl isInvalid={!!errors.district}>
            <FormLabel pl={2} fontWeight="bold" color="green.500" htmlFor="district">Bairro</FormLabel>
            <EditableLayout defaultValue={defaultValues.district}>
              <EditableInput id="district" type="text" {...register('district')} />
            </EditableLayout>
            <FormErrorMessage>
              {errors.district && errors.district.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.number}>
            <FormLabel pl={2} fontWeight="bold" color="green.500" htmlFor="number">Número</FormLabel>
            <EditableLayout defaultValue={defaultValues.number as any}>
              <EditableInput id="number" type="number" {...register('number')} />
            </EditableLayout>
            <FormErrorMessage>
              {errors.number && errors.number.message}
            </FormErrorMessage>
          </FormControl>

        </HStack>

        <HStack mb="2">
          <FormControl isInvalid={!!errors.city}>
            <FormLabel pl={2} fontWeight="bold" color="green.500" htmlFor="city">Cidade</FormLabel>
            <EditableLayout defaultValue={defaultValues.city}>
              <EditableInput id="city" type="text" {...register('city')} />
            </EditableLayout>
            <FormErrorMessage>
              {errors.city && errors.city.message}
            </FormErrorMessage>
          </FormControl>
        </HStack>

        <HStack mb="2">
          <FormControl isInvalid={!!errors.complement}>
            <FormLabel pl={2} fontWeight="bold" color="green.500" htmlFor="complement">Complemento</FormLabel>
            <EditableLayout defaultValue={defaultValues.complement}>
              <EditableInput id="complement" type="text" {...register('complement')} />
            </EditableLayout>
            <FormErrorMessage>
              {errors.complement && errors.complement.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.state}>
            <FormLabel pl={2} fontWeight="bold" color="green.500" htmlFor="state">Estado</FormLabel>
            <EditableLayout defaultValue={defaultValues.state}>
              <EditableInput id="state" type="text" {...register('state')} />
            </EditableLayout>
            <FormErrorMessage>
              {errors.state && errors.state.message}
            </FormErrorMessage>
          </FormControl>
        </HStack>

        <Button type="submit" isLoading={isSubmitting}>Salvar</Button>
      </form>
    </Box>
  );
}
