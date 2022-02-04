import type { NextPage } from 'next';
import Head from 'next/head';

import useAuth from '../contexts/auth';

const Home: NextPage = () => {
  const { logout } = useAuth();

  return (
    <>
      <Head>
        <title>Ezly</title>
        <meta name="description" content="Ezly | Link management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Home;
