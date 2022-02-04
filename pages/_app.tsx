import axios from 'axios';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';

import { AuthProvider } from '../contexts/auth';

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

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // in development mode using a JWT from an http secure cookie is not possible
      // so we store the JWT in localStorage with the 'token' key
      // we add an interceptor to add the authorization header
      const id = axios.interceptors.request.use((config) => {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${localStorage.getItem('token')}`,
        };
        return config;
      });

      return () => {
        axios.interceptors.request.eject(id);
      };
    }
  }, []);

  return (
    <ChakraProvider theme={chakraTheme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
