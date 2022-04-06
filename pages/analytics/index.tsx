import Head from 'next/head';
import React from 'react';
import { LayoutPage } from '../../types/ui';

const AnalyticsList: LayoutPage = () => {
  return (
    <>
      <Head>
        <title>Analytics</title>
      </Head>
      <div>Analytics</div>
      <p>Display list of links</p>
    </>
  );
};

AnalyticsList.layout = 'dashboard';

export default AnalyticsList;
