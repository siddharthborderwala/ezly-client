import {
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
  chakra,
  useToast,
  Box,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useAuth from '../contexts/auth';

const Form = chakra.form;

const RegisterPage: React.FC = () => {
  const { register, user } = useAuth();
  const { replace } = useRouter();
  const toast = useToast();

  if (user) {
    replace('/');
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    e.persist();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      await register(
        data.email.toString(),
        data.password.toString(),
        data.passwordConfirmation.toString()
      );
      replace('/');
    } catch (error) {
      toast({
        status: 'error',
        title: 'Invalid credentials',
      });
    }
  };

  return (
    <Center height="100vh" backgroundColor="gray.200">
      <Box boxShadow="md" rounded="md" padding="6" backgroundColor="white">
        <Form onSubmit={handleSubmit} experimental_spaceY="4">
          <FormControl>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="johndoe@example.com"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="passwordConfirmation">
              Password Confirmation
            </FormLabel>
            <Input
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              placeholder="password"
            />
          </FormControl>
          <Button variant="solid" type="submit">
            Register
          </Button>
        </Form>
        <Text marginTop="6">
          Already a member?{' '}
          <Link href="/login" passHref>
            <ChakraLink textDecoration="underline" color="purple.500">
              Login
            </ChakraLink>
          </Link>
        </Text>
      </Box>
    </Center>
  );
};

export default RegisterPage;
