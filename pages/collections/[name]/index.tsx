import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Spacer,
    Spinner,
    Table, TableContainer,
    Tbody, Th,
    Thead,
    Tr,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import CreateLink from '../../../components/links/CreateLink';
import LinkItem from '../../../components/links/LinkItem';
import { LayoutPage } from '../../../types/ui';

const CollectionItemPage: LayoutPage = () => {
  const { name } = useRouter().query as any;
  const [loading, setLoading] = useState(false);

  const { data, error } = useSWR(`/v1/collections/${name}`, axios);
  const router = useRouter();

  const toast = useToast();

  if (error) {
    return <>Failed to load</>;
  }

  if (!data) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  const handleDelete = async () => {
    setLoading(true);

    try {
      await axios({
        method: 'delete',
        url: `/v1/collections`,
        data: {
          collectionId: data.data.collection.id,
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

  return (
    <>
      <Head>
        <title>Collection {name}</title>
      </Head>
      <Flex>
        <Heading padding="2">{data.data.collection.name}</Heading>
        <Spacer />
        <Button onClick={handleDelete}>Delete Collection</Button>
      </Flex>
      <Box padding="2">
        <Divider />
        <CreateLink collectionName={name} />
        <Divider />
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
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
      </Box>
    </>
  );
};

CollectionItemPage.layout = 'dashboard';

export default CollectionItemPage;
