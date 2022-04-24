import { Box, Divider, Heading, Spinner, Spacer, Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import CreateCollection from '../../components/collections/CreateCollection';
import { LayoutPage } from '../../types/ui';
import { withProtection } from '../../hoc/with-protection';
import { NextPage } from 'next';

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
    router.push(`/collections/${collectionName}`);
  }

  return (
    <>
      <Head>
        <title>All Collections</title>
      </Head>

      <Flex alignItems="center" justifyContent="center">
        <Heading>Collections</Heading>
        <Spacer />
        <AddIcon
          onClick={() => setShow(!show)}
          boxSize="1.5em"
          cursor="pointer"
        />
      </Flex>

      <Divider />

      {show && <CreateCollection setShow={setShow} />}

      {data?.data.collections.map((collection: any) => (
        <Box
          key={collection.id}
          padding="4"
          border="1px"
          marginTop="2"
          maxWidth="30%"
          borderColor="gray.200"
          borderRadius="2xl"
          backgroundColor="gray.50"
          fontWeight="semibold"
          cursor="pointer"
          id={collection.id}
          onClick={() => handleClick(collection.name)}
        >
          {collection.name}
        </Box>
      ))}
    </>
  );
};

const CollectionsListPage = withProtection(CollectionsList) as LayoutPage;

CollectionsListPage.layout = 'dashboard';

export default CollectionsListPage;
