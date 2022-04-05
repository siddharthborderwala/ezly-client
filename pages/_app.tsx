import axios from 'axios';
import type { AppProps } from 'next/app';
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';

import { layoutsMap } from '../layouts';
import { AuthProvider } from '../contexts/auth';
import useDevAuthPlugin from '../hooks/useDevAuthPlugin';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
axios.defaults.withCredentials = process.env.NODE_ENV === 'production';

const chakraTheme = extendTheme(
  withDefaultColorScheme({ colorScheme: 'teal' }),
  {
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
  }
);

type CustomAppProps = AppProps & {
  Component: {
    layout?: keyof typeof layoutsMap;
  };
};

const DefaultLayout: React.FC = ({ children }) => <>{children}</>;

const MyApp: React.FC<CustomAppProps> = ({ Component, pageProps }) => {
  useDevAuthPlugin();
  const Layout = Component.layout
    ? layoutsMap[Component.layout]
    : DefaultLayout;

  return (
    <ChakraProvider theme={chakraTheme}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
