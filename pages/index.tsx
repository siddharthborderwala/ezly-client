import { NextPage } from 'next';
import Head from 'next/head';
import { withProtection } from '../hoc/with-protection';
import { LayoutPage } from '../types/ui';
import {
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue,
  Center,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Spinner,
} from '@chakra-ui/react';
import Card from '../components/card/Card';
import {
  GlobeIcon,
  ProfileIcon,
  RocketIcon,
  DocumentIcon,
} from '../components/icons/Icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface overview {
  collections: number;
  links: number;
  clicks: number;
}

const Home: NextPage = () => {
  const defaultOverview: overview = {
    collections: 0,
    links: 0,
    clicks: 0,
  };

  const [overview, setOverview] = useState<overview>(defaultOverview);

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/v1/stats/profile/overview')
      .then((res) => {
        setOverview(res.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const iconBoxInside = useColorModeValue('white', 'white');

  return (
    <>
      <Head>
        <title>Ezly Dashboard</title>
        <meta name="description" content="Ezly | Link management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading p={5}>Dashboard</Heading>
      {loading ? (
        <Center h="100%">
          <Spinner />
        </Center>
      ) : error ? (
        <>
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Error Fetching Data
            </AlertTitle>
            <AlertDescription maxWidth="sm">{error}</AlertDescription>
          </Alert>
        </>
      ) : (
        <Flex flexDirection="column" pt={{ base: '120px', md: '75px' }}>
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
            <Card
              title="Total Collections"
              data={overview.collections}
              icon={
                <DocumentIcon h={'24px'} w={'24px'} color={iconBoxInside} />
              }
            />
            <Card
              title="Total Links"
              data={overview.links}
              icon={<GlobeIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
            />
            <Card
              title="Total Clicks"
              data={overview.clicks}
              icon={<RocketIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
            />
            <Card
              title="Profile Visits"
              data={3}
              icon={<ProfileIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
            />
          </SimpleGrid>
        </Flex>
      )}
    </>
  );
};

const HomePage = withProtection(Home) as LayoutPage;

HomePage.layout = 'dashboard';

export default HomePage;
