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
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { schemaClientAddress } from '../../models/yup/formSchema';
import { ClientInfo } from '../../types';

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
    console.log(data);
  };
  return (

    <Box p={4} borderRadius="2xl" boxShadow="base">
      <Heading as="h3" size="md" mb="2">Endereço</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>

        <VStack mb="2" alignContent="flex-start" alignItems="flex-start">
          <FormControl isInvalid={!!errors.zipcode}>
            <FormLabel htmlFor="zipcode">CEP</FormLabel>
            <Input w="50%" id="zipcode" type="text" {...register('zipcode')} />
            <FormErrorMessage>
              {errors.zipcode && errors.zipcode.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.street}>
            <FormLabel htmlFor="street">Rua</FormLabel>
            <Input id="street" type="text" {...register('street')} />
            <FormErrorMessage>
              {errors.street && errors.street.message}
            </FormErrorMessage>
          </FormControl>
        </VStack>

        <HStack mb="2">
          <FormControl isInvalid={!!errors.district}>
            <FormLabel htmlFor="district">Bairro</FormLabel>
            <Input id="district" type="text" {...register('district')} />
            <FormErrorMessage>
              {errors.district && errors.district.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.number}>
            <FormLabel htmlFor="number">Número</FormLabel>
            <Input id="number" type="number" {...register('number')} />
            <FormErrorMessage>
              {errors.number && errors.number.message}
            </FormErrorMessage>
          </FormControl>
        </HStack>

        <HStack mb="2">
          <FormControl isInvalid={!!errors.city}>
            <FormLabel htmlFor="city">Cidade</FormLabel>
            <Input id="city" type="text" {...register('city')} />
            <FormErrorMessage>
              {errors.city && errors.city.message}
            </FormErrorMessage>
          </FormControl>
        </HStack>

        <HStack mb="2">
          <FormControl isInvalid={!!errors.complement}>
            <FormLabel htmlFor="complement">Complemento</FormLabel>
            <Input id="complement" type="text" {...register('complement')} />
            <FormErrorMessage>
              {errors.complement && errors.complement.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.state}>
            <FormLabel htmlFor="state">Estado</FormLabel>
            <Input id="state" type="text" {...register('state')} />
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
