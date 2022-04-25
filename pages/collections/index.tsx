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
} from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import React, { useState } from 'react';
import useSWR from 'swr';
import CreateCollection from '../../components/collections/CreateCollection';
import { LayoutPage } from '../../types/ui';
import { withProtection } from '../../hoc/with-protection';
import { NextPage } from 'next';
import { Plus } from 'phosphor-react';
import Link from 'next/link';

const CollectionsList: NextPage = () => {
  const [show, setShow] = useState(false);
  const { data, error } = useSWR('/v1/collections/all', axios);

  if (error) {
    return <>Failed to load</>;
  }

  if (!data) {
    return (
      <Center height="full" width="full">
        <Spinner />
      </Center>
    );
  }

  return (
    <>
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

      <Divider mt="2" mb="4" />

      {show && <CreateCollection setShow={setShow} />}

      {data?.data.collections.map((collection: any) => (
        <Link
          passHref
          key={collection.id}
          href={`/collections/${collection.name}`}
        >
          <ChakraLink
            display="block"
            padding="4"
            border="1px"
            marginTop="2"
            maxWidth="30%"
            borderColor="gray.200"
            borderRadius="2xl"
            backgroundColor="gray.50"
            fontWeight="semibold"
          >
            {collection.name}
          </ChakraLink>
        </Link>
      ))}
    </>
  );
};

const CollectionsListPage = withProtection(CollectionsList) as LayoutPage;

CollectionsListPage.layout = 'dashboard';

export default CollectionsListPage;
