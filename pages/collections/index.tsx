import {
  Box,
  Divider,
  Heading,
  Spinner,
  Spacer,
  Flex,
  Button,
  Link as ChakraLink,
  Center,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Table,
  IconButton,
  Tooltip,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import React, { useMemo, useState } from 'react';
import useSWR from 'swr';
import CreateCollection from '../../components/collections/CreateCollection';
import { LayoutPage } from '../../types/ui';
import { withProtection } from '../../hoc/with-protection';
import { NextPage } from 'next';
import { ArrowSquareOut, Plus } from 'phosphor-react';
import Link from 'next/link';
import useDebounce from '../../hooks/useDebounce';

const CollectionsList: NextPage = () => {
  const [show, setShow] = useState(false);
  const { data, error } = useSWR('/v1/collections/all', axios);
  const [collectionsFilter, setCollectionsFilter] = useState('');
  const debouncedCollectionsFilter = useDebounce(collectionsFilter, 500);

  const filteredCollections = useMemo(() => {
    if (!data || !data?.data) {
      return [];
    }

    return data.data.collections.filter((collection: any) =>
      collection.name
        .toLowerCase()
        .includes(debouncedCollectionsFilter.toLowerCase())
    );
  }, [data, debouncedCollectionsFilter]);

  if (error) {
    return <>Failed to load</>;
  }

  if (!data?.data) {
    return (
      <Center height="full" width="full">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box as="main" padding="4">
      <Head>
        <title>All Collections</title>
      </Head>
      <Flex alignItems="center" justifyContent="center">
        <Heading>Collections</Heading>
        <Spacer />
        <Button
          variant="outline"
          leftIcon={<Plus weight="bold" />}
          onClick={() => setShow(!show)}
          size="sm"
        >
          New Collection
        </Button>
      </Flex>
      {show && <CreateCollection setShow={setShow} />}
      <Box as="section" mt="8">
        <FormControl>
          <FormLabel htmlFor="collections-filter">
            Filter Collections by Name
          </FormLabel>
          <Input
            onChange={(e) => setCollectionsFilter(e.target.value)}
            value={collectionsFilter}
            id="collections-filter"
            type="text"
            placeholder="Search"
          />
        </FormControl>
        <TableContainer borderTop="1px" borderColor="teal.100" mt="8">
          <Table colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Created At</Th>
                <Th>View</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredCollections.map(
                (collection: {
                  id: string;
                  createdAt: string;
                  name: string;
                }) => (
                  <Tr key={collection.id}>
                    <Td>{collection.name}</Td>
                    <Td>
                      {new Date(collection.createdAt).toLocaleDateString(
                        'en-IN',
                        {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        }
                      )}
                    </Td>
                    <Td>
                      <Link href={`/collections/${collection.name}`} passHref>
                        <ChakraLink>
                          <Tooltip label="View Collection">
                            <IconButton
                              variant="outline"
                              aria-label="View collection"
                              icon={<ArrowSquareOut weight="bold" />}
                            />
                          </Tooltip>
                        </ChakraLink>
                      </Link>
                    </Td>
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

const CollectionsListPage = withProtection(CollectionsList) as LayoutPage;

CollectionsListPage.layout = 'dashboard';

export default CollectionsListPage;
