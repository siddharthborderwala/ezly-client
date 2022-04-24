import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { LayoutPage } from '../../../../types/ui';
import AnalyticsPage from '../../../../components/AnalyticsPage';
import { NextPage } from 'next';
import { withProtection } from '../../../../hoc/with-protection';

const AnalyticsItem: NextPage = () => {
  const { linkAlias } = useRouter().query as any;
  const { name } = useRouter().query as any;
  return (
    <>
      <Head>
        <title>Analytics {linkAlias}</title>
      </Head>
      <AnalyticsPage alias={linkAlias} collection={name} />
    </>
  );
};

const AnalyticsItemPage = withProtection(AnalyticsItem) as LayoutPage;

AnalyticsItemPage.layout = 'dashboard';

export default AnalyticsItemPage;
