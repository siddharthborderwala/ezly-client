import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { LayoutPage } from '../../types/ui';
import AnalyticsPage from '../../components/AnalyticsPage';

const AnalyticsItemPage: LayoutPage = () => {
  const { linkAlias } = useRouter().query as any;
  return (
    <>
      <Head>
        <title>Analytics {linkAlias}</title>
      </Head>
      <AnalyticsPage alias={linkAlias} />
    </>
  );
};

AnalyticsItemPage.layout = 'dashboard';

export default AnalyticsItemPage;
