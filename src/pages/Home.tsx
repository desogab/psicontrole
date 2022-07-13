import {
  Flex,
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Spacer,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth/AuthContext';
import { schemaAuthentication } from '../models/yup/formSchema';

interface FormInputs {
  email: string;
  password: string;
}

export function Home() {
  const { login } = useAuth();
  const {
    register, handleSubmit, formState: {
      errors, isSubmitting,
    },
  } = useForm<FormInputs>({
    resolver: yupResolver(schemaAuthentication),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const response = new Promise<void>((resolve) => {
      setTimeout(async () => {
        // eslint-disable-next-line no-alert
        await login(data);
        resolve();
      }, 2000);
    });
    return response;
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" flexDirection="column">
      <Heading textAlign="center">Psicontrole</Heading>
      <Flex
        w="100%"
        maxW={360}
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="4">
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" {...register('email')} />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <Input id="password" type="password" {...register('password')} />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Button w="100%" type="submit" mt="6" size="lg" isLoading={isSubmitting}>
            Entrar
          </Button>
        </form>
      </Flex>
    </Flex>
  );
}
