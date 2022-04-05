import Head from 'next/head';
import React from 'react';
import { LayoutPage } from '../../types/ui';

const CollectionsList: LayoutPage = () => {
  return (
    <>
      <Head>
        <title>All Collections</title>
      </Head>
      <div>list</div>
    </>
  );
};

CollectionsList.layout = 'dashboard';

export default CollectionsList;
