import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { LayoutPage } from '../../types/ui';

const CollectionItemPage: LayoutPage = () => {
  const { name } = useRouter().query as any;
  return (
    <>
      <Head>
        <title>Collection {name}</title>
      </Head>
      <div>{name}</div>
    </>
  );
};

CollectionItemPage.layout = 'dashboard';

export default CollectionItemPage;
