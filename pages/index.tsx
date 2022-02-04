import { Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useAuth from '../contexts/auth';

const Home: NextPage = () => {
  const { user, logout } = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    if (user === null) {
      replace('/login');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Ezly</title>
        <meta name="description" content="Ezly | Link management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Welcome home!</h1>
      <Button variant="solid" onClick={logout}>
        Logout
      </Button>
    </>
  );
};

export default Home;
