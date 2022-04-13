import React, { useState } from 'react';
import axios from 'axios';
import CountryVisualization from './CountryVisualization';
import PieChart from './PieChart';
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
} from '@chakra-ui/react';

interface linkStat {
  url: string;
  alias: string;
  clicks: number;
  collection: string;
  analytics: {
    countries: {
      [key: string]: any;
    };
    referers: {
      [key: string]: any;
    };
    devices: {
      [key: string]: any;
    };
    operatingSystems: {
      [key: string]: any;
    };
    browsers: {
      [key: string]: any;
    };
    langauges: {
      [key: string]: any;
    };
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

  React.useEffect(() => {
    axios
      .get(`/v1/track/${props.alias}`)
      .then((res) => {
        setLinkData(res.data.stats);
        setLoading(false);
      })
      .catch((e) => {
        const err =
          e.response.status === 404
            ? 'Resource Not found'
            : 'An unexpected error has occurred';
        setError(err);
        setLoading(false);
      });
  }, [props.alias]);

  return (
    <>
      {loading ? (
        <Center h="100%">
          <Spinner />
        </Center>
      ) : error ? (
        <>
          {/* add 404 page */}
          <h2>{error}</h2>
        </>
      ) : (
        <ChakraProvider resetCSS>
          <Box width="full" height="full">
            <Flex justifyContent="space-between" m="2" p="2">
              <Breadcrumb>
                <BreadcrumbItem color={mainText}>
                  <BreadcrumbLink href="/collections">
                    Collections
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem color={secondaryText}>
                  <BreadcrumbLink href={`/collections/${props.collection}`}>
                    {props.collection}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem color={mainText}>
                  <Text>Analytics</Text>
                </BreadcrumbItem>
                <BreadcrumbItem color={mainText}>
                  <BreadcrumbLink
                    href={`\\${linkData.alias}`}
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
