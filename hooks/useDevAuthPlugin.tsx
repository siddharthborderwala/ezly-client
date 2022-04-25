import axios from 'axios';
import { useEffect } from 'react';

const useDevAuthPlugin = () => {
  useEffect(() => {
    // if (process.env.NODE_ENV === 'development') {
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
    // }
  }, []);
};

export default useDevAuthPlugin;
