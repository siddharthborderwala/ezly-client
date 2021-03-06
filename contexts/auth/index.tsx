import { Center, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type UserType = {
  id: string;
  email: string;
  username: string;
};

type AuthResponsePayload = {
  user: UserType;
  token: string;
};

type AuthContextValue = {
  ready: boolean;
  user: UserType | null;
  login: (
    email: string,
    password: string
  ) => Promise<AuthResponsePayload | undefined>;
  logout: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<AuthResponsePayload | undefined>;
} | null;

const AuthContext = createContext<AuthContextValue>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const { replace, pathname } = useRouter();

  const getMe = useCallback(async () => {
    try {
      const { data } = await axios.get<UserType>('/v1/auth/me', {
        headers:
          process.env.NODE_ENV === 'development'
            ? {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              }
            : {},
      });
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setReady(true);
    }
  }, [setUser, setReady]);

  useEffect(() => {
    getMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: AuthContextValue = {
    ready,
    user,
    logout: async () => {
      await axios.post('/v1/auth/logout');
      if (process.env.NODE_ENV === 'development') {
        localStorage.removeItem('token');
      }
      setUser(null);
      replace('/login');
    },
    login: async (email: string, password: string) => {
      const res = await axios.post<AuthResponsePayload>('/v1/auth/login', {
        email,
        password,
      });
      // if (process.env.NODE_ENV === 'development') {
      localStorage.setItem('token', res.data.token);
      // }
      setUser(res.data.user);
      return res.data;
    },
    register: async (
      username: string,
      email: string,
      password: string,
      passwordConfirmation: string
    ) => {
      const res = await axios.post<AuthResponsePayload>('/v1/auth/register', {
        username,
        email,
        password,
        passwordConfirmation,
      });
      // if (process.env.NODE_ENV === 'development') {
      localStorage.setItem('token', res.data.token);
      // }
      setUser(res.data.user);
      return res.data;
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {ready ? (
        children
      ) : (
        <Center height="100vh" width="100vw" backgroundColor="gray.50">
          <Spinner />
        </Center>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext<AuthContextValue>(AuthContext)!;
