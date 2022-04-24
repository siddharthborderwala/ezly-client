import { NextPage } from 'next';
import Head from 'next/head';
import { withProtection } from '../hoc/with-protection';
import { LayoutPage } from '../types/ui';

const Home: NextPage = () => {
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

const HomePage = withProtection(Home) as LayoutPage;

HomePage.layout = 'dashboard';

export default HomePage;
