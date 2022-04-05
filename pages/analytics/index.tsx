import Head from 'next/head';
import React from 'react';
import { LayoutPage } from '../../types/ui';

const CollectionsList: LayoutPage = () => {
  return (
    <>
      <Head>
        <title>Analytics</title>
      </Head>
      <div>Analytics</div>
    </>
  );
};

CollectionsList.layout = 'dashboard';

export default CollectionsList;
