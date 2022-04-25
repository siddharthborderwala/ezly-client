import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
  Text,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Trash } from 'phosphor-react';
import React, { useState } from 'react';
import useSWR from 'swr';
import CreateLink from '../../../components/links/CreateLink';
import LinkItem from '../../../components/links/LinkItem';
import { withProtection } from '../../../hoc/with-protection';
import { LayoutPage } from '../../../types/ui';

const CollectionItem: NextPage = () => {
  const { name } = useRouter().query as any;
  const [loading, setLoading] = useState(false);

  const { data, error } = useSWR(`/v1/collections/${name}`, axios);
  const router = useRouter();

  const toast = useToast();

  const handleDelete = async () => {
    setLoading(true);

    try {
      await axios({
        method: 'delete',
        url: `/v1/collections`,
        data: {
          collectionId: data?.data.collection.id,
        },
      });
      toast({
        status: 'success',
        title: 'collection deleted successfully',
      });
      router.push('/collections');
    } catch (err) {
      toast({
        status: 'error',
        description: (err as any).response.data.msg,
      });
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <>Failed to load</>;
  }

  if (!data?.data.collection) {
    return (
      <Center height="full" width="full">
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      <Head>
        <title>Collection {name}</title>
      </Head>
      <Flex alignItems="center">
        <Heading padding="2">{data.data.collection.name}</Heading>
        <Button
          colorScheme="red"
          ml="auto"
          leftIcon={<Trash weight="bold" />}
          onClick={handleDelete}
          isLoading={loading}
        >
          Delete Collection
        </Button>
      </Flex>
      <Box padding="2">
        <Divider />
        <CreateLink collectionName={name} />

        {data.data.collection.links.length === 0 ? (
          <Text width="full" textAlign="center" mt="8">
            No links to view
          </Text>
        ) : (
          <TableContainer borderTop="1px" borderColor="teal.100" mt="8">
            <Table colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>URL</Th>
                  <Th>Short Url</Th>
                  <Th>Analytics</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.data.collection.links.map((link: any) => (
                  <LinkItem
                    key={link.id}
                    id={link.id}
                    linkData={link}
                    collectionName={name}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

const CollectionItemPage = withProtection(CollectionItem) as LayoutPage;

CollectionItemPage.layout = 'dashboard';

export default CollectionItemPage;
