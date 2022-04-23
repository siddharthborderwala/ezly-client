import Head from 'next/head';
import { LayoutPage } from '../types/ui';
import { Flex, Heading, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import Card from '../components/card/Card';
import {
  GlobeIcon,
  ProfileIcon,
  RocketIcon,
  DocumentIcon,
} from '../components/icons/Icons';

const Home: LayoutPage = () => {
  const iconBoxInside = useColorModeValue('white', 'white');
  return (
    <>
      <Head>
        <title>Ezly Dashboard</title>
        <meta name="description" content="Ezly | Link management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading p={5}>Dashboard</Heading>
      <Flex flexDirection="column" pt={{ base: '120px', md: '75px' }}>
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
          <Card
            title="Total Collections"
            data="6"
            icon={<DocumentIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
          />
          <Card
            title="Total Links"
            data="4"
            icon={<GlobeIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
          />
          <Card
            title="Total Views"
            data="8"
            icon={<RocketIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
          />
          <Card
            title="Total Profile Views"
            data="4"
            icon={<ProfileIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
          />
        </SimpleGrid>
      </Flex>
    </>
  );
};

Home.layout = 'dashboard';

export default Home;
