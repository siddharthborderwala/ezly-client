import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { LayoutPage } from '../../types/ui';
import { Box, Divider, Heading, Spinner } from '@chakra-ui/react';
import LinkItem from '../../components/links/LinkItem';

const CollectionItemPage: LayoutPage = () => {
  const { name } = useRouter().query as any;

  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(`/v1/collections/${name}`, axios);

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

  const handleDelete = () => {};

  const handleUpdate = () => {};

  const handleCreateLink = async () => {
    await mutate(`/v1/collections/${name}`);
  };

  return (
    <>
      <Head>
        <title>Collection {name}</title>
      </Head>
      <Heading padding="2">{data.data.collection.name}</Heading>
      <Divider />
      {data.data.collection.links.map((link: any) => {
        return <LinkItem id={link.id} linkData={link} collectionName={name} />;
      })}
    </>
  );
};

CollectionItemPage.layout = 'dashboard';

export default CollectionItemPage;
