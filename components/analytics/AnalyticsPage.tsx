import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {
  ChakraProvider,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Spinner,
  Text,
  Center,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from '@chakra-ui/react';
import CountryVisualization from './CountryVisualization';
import PieChart from './PieChart';
import { ChevronRightIcon } from '@chakra-ui/icons';

interface linkStat {
  url: string;
  alias: string;
  clicks: number;
  collection: string;
  analytics: {
    countries: Record<string, any>;
    referers: Record<string, any>;
    devices: Record<string, any>;
    operatingSystems: Record<string, any>;
    browsers: Record<string, any>;
    langauges: Record<string, any>;
  };
}

const AnalyticsPage: React.FC<{ alias: string; collection: string }> = (
  props
) => {
  const defaultStats: linkStat = {
    url: '',
    alias: '',
    clicks: 0,
    collection: '',
    analytics: {
      countries: {},
      referers: {},
      devices: {},
      operatingSystems: {},
      browsers: {},
      langauges: {},
    },
  };

  const [linkData, setLinkData] = useState<linkStat>(defaultStats);

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(true);

  const mainText = useColorModeValue('gray.700', 'gray.200');
  const secondaryText = useColorModeValue('gray.400', 'gray.200');

  const toast = useToast();

  React.useEffect(() => {
    axios
      .get(`/v1/stats/${props.alias}`)
      .then((res) => {
        setLinkData(res.data.stats);
        setLoading(false);
        if (!res.data.stats.clicks) {
          toast({
            title: 'No stats found',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((e) => {
        const err =
          e.response.status === 404
            ? 'Resource Not found'
            : 'An unexpected error has occurred';
        setError(err);
        setLoading(false);
      });
  }, [props.alias, toast]);

  return (
    <>
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
        <ChakraProvider resetCSS>
          <Box width="full" height="full">
            <Flex justifyContent="space-between" m="2" p="2">
              <Breadcrumb
                spacing="2"
                separator={<ChevronRightIcon color="gray.500" />}
              >
                <BreadcrumbItem color={mainText}>
                  <BreadcrumbLink href="/collections">
                    collections
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem color={secondaryText}>
                  <Link href={`/collections/${props.collection}`} passHref>
                    <BreadcrumbLink>{props.collection}</BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem color={mainText}>
                  <Text>analytics</Text>
                </BreadcrumbItem>
                <BreadcrumbItem color={mainText}>
                  <BreadcrumbLink
                    href={`https://ezly.tech/${linkData.alias}`}
                    target="_blank"
                    color={secondaryText}
                  >
                    {linkData.alias}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Box>Total clicks = {linkData.clicks}</Box>
            </Flex>
            <Flex justifyContent="space-around" h="55%">
              <Box
                display="flex"
                flexDirection="column"
                w="100%"
                borderWidth="2px"
                m="1"
              >
                <Box>
                  <Text textAlign="center" color={mainText} p="1">
                    Countries
                  </Text>
                </Box>
                <Box h="100%">
                  <CountryVisualization
                    data={linkData.analytics.countries || []}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                borderWidth="2px"
                w="45%"
                m="1"
              >
                <Box>
                  <Text textAlign="center" color={mainText} p="1">
                    Browsers
                  </Text>
                </Box>
                <Box h="100%">
                  <PieChart data={linkData.analytics.browsers || []} />
                </Box>
              </Box>
            </Flex>
            <Flex justifyContent="space-around" h="35%">
              <Box
                display="flex"
                flexDirection="column"
                w="33%"
                borderWidth="2px"
              >
                <Box>
                  <Text textAlign="center" color={mainText} p="1">
                    Referers
                  </Text>
                </Box>
                <Box h="100%">
                  <PieChart data={linkData.analytics.referers || []} />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                w="33%"
                borderWidth="2px"
              >
                <Box>
                  <Text textAlign="center" color={mainText} p="1">
                    Devices
                  </Text>
                </Box>
                <Box h="100%">
                  <PieChart data={linkData.analytics.devices || []} />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                w="33%"
                borderWidth="2px"
              >
                <Box>
                  <Text textAlign="center" color={mainText} p="1">
                    Operating systems
                  </Text>
                </Box>
                <Box h="100%">
                  <PieChart data={linkData.analytics.operatingSystems || []} />
                </Box>
              </Box>
            </Flex>
          </Box>
        </ChakraProvider>
      )}
    </>
  );
};

export default AnalyticsPage;
