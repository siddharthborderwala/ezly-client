import Head from 'next/head';
import React from 'react';
import { LayoutPage } from '../../types/ui';
import axios from 'axios';
import useSWR from 'swr';
import { Spinner, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const CollectionsList: LayoutPage = () => {
  const { data, error } = useSWR('/v1/collections/all', axios);

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
      {data?.data.collections.map((collection: any) => (
        <Box
          key={collection.id}
          padding="4"
          border="1px"
          margin="4"
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

CollectionsList.layout = 'dashboard';

export default CollectionsList;
