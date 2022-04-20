import Head from 'next/head';
import { LayoutPage } from '../types/ui';
import { Flex, Grid, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import MiniStatistics from '../components/dashboard/MiniStatistics';
import { WalletIcon } from '../components/icons/Icons';

const Home: LayoutPage = () => {
  const iconBoxInside = useColorModeValue('white', 'white');
  return (
    <>
      <Head>
        <title>Ezly Dashboard</title>
        <meta name="description" content="Ezly | Link management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDirection="column" pt={{ base: '120px', md: '75px' }}>
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
          <MiniStatistics
            title={"Today's Moneys"}
            amount={'$53,000'}
            icon={<WalletIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
          />
          <MiniStatistics
            title={"Today's Users"}
            amount={'2,300'}
            icon={<WalletIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
          />
          <MiniStatistics
            title={'New Clients'}
            amount={'+3,020'}
            icon={<WalletIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
          />
          <MiniStatistics
            title={'Total Sales'}
            amount={'$173,000'}
            icon={<WalletIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
          />
        </SimpleGrid>
        {/* <Grid
          templateColumns={{ sm: '1fr', lg: '1.3fr 1.7fr' }}
          templateRows={{ sm: 'repeat(2, 1fr)', lg: '1fr' }}
          gap="24px"
          mb={{ lg: '26px' }}
        >
          <ActiveUsers
            title={'Active Users'}
            percentage={23}
            chart={<BarChart />}
          />
          <SalesOverview
            title={'Sales Overview'}
            percentage={5}
            chart={<LineChart />}
          />
        </Grid> */}
      </Flex>
    </>
  );
};

Home.layout = 'dashboard';

export default Home;
