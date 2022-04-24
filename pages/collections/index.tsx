import {
  Box,
  Divider,
  Heading,
  Spinner,
  Spacer,
  Flex,
  Button,
  Link as ChakraLink,
} from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import CreateCollection from '../../components/collections/CreateCollection';
import { LayoutPage } from '../../types/ui';
import { withProtection } from '../../hoc/with-protection';
import { NextPage } from 'next';
import { Plus } from 'phosphor-react';
import Link from 'next/link';

const CollectionsList: NextPage = () => {
  const { data, error } = useSWR('/v1/collections/all', axios);

  const [show, setShow] = useState(false);

  const router = useRouter();

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

  function handleClick(collectionName: string) {
    router.push(``);
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
