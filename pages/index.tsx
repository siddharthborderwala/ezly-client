import Head from 'next/head';
import { LayoutPage } from '../types/ui';

const Home: LayoutPage = () => {
  return (
    <>
      <Head>
        <title>Ezly</title>
        <meta name="description" content="Ezly | Link management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Welcome to your dashboard!</h1>
    </>
  );
};

Home.layout = 'dashboard';

export default Home;
