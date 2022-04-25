import { NextPage } from 'next';
import Head from 'next/head';
import { withProtection } from '../hoc/with-protection';
import { LayoutPage } from '../types/ui';
import {
  Flex,
  Heading,
  Box,
  Center,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Spinner,
  Avatar,
  Menu,
  Button,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/auth';
import {
  Folder,
  Plus,
  SignOut,
  Link as LinkIcon,
  HandPointing,
} from 'phosphor-react';
import { useRouter } from 'next/router';
import OverviewCard from '../components/OverviewCard';
import ActivityCard from '../components/ActivityCard';

type Overview = {
  collections: number;
  links: number;
  clicks: number;
  latestLink: {
    id: string;
    url: string;
    collection: string;
  } | null;
  popularLink: {
    id: string;
    url: string;
    collection: string;
  } | null;
};

const defaultOverview: Overview = {
  collections: 0,
  links: 0,
  clicks: 0,
  latestLink: null,
  popularLink: null,
};

const Home: NextPage = () => {
  const [overview, setOverview] = useState<Overview>(defaultOverview);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const { push } = useRouter();

  const createNewLink = () => {
    push('/collections/general');
  };

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

  return (
    <>
      <Head>
        <title>Ezly Dashboard</title>
        <meta name="description" content="Ezly | Link management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box p="4">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading fontSize="2rem">Dashboard</Heading>
          <Menu>
            <MenuButton
              as={Button}
              border="none"
              borderRadius="50%"
              variant="unstyled"
              height="12"
              width="12"
            >
              <Avatar name={user?.username} />
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<Plus weight="bold" height="18" width="18" />}
                onClick={createNewLink}
              >
                New Link
              </MenuItem>
              <MenuItem
                icon={<SignOut weight="bold" height="18" width="18" />}
                onClick={logout}
              >
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>

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
        <Box as="main" padding="4">
          <Box as="section">
            <Heading as="h3" fontSize="1.25rem">
              Overview
            </Heading>
            <Flex gap="1rem" mt="4">
              <OverviewCard
                label="Collections"
                value={overview.collections}
                link="/collections"
                icon={<Folder height="24" width="24" color="white" />}
              />
              <OverviewCard
                label="Links"
                link="/collections/general"
                value={overview.links}
                icon={<LinkIcon height="24" width="24" color="white" />}
              />
              <OverviewCard
                label="Total Clicks"
                link="#"
                value={overview.clicks}
                icon={<HandPointing height="24" width="24" color="white" />}
              />
            </Flex>
          </Box>
          <Box as="section" mt="8">
            <Heading as="h3" fontSize="1.25rem">
              Activity
            </Heading>
            <Flex gap="1rem" mt="4">
              <ActivityCard
                label="Latest Links"
                link={overview.latestLink}
                url={overview.latestLink?.url ?? '#'}
              />
              <ActivityCard
                label="Popular Links"
                link={overview.popularLink}
                url={overview.latestLink?.url ?? '#'}
              />
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
};

const HomePage = withProtection(Home) as LayoutPage;

HomePage.layout = 'dashboard';

export default HomePage;
