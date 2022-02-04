import axios from 'axios';
import { createContext, useContext, useState } from 'react';

type UserType = {
  id: string;
  email: string;
};

type AuthResponsePayload = {
  user: UserType;
  token: string;
};

type AuthContextValue = {
  user: UserType | null;
  login: (
    email: string,
    password: string
  ) => Promise<AuthResponsePayload | undefined>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<AuthResponsePayload | undefined>;
} | null;

const AuthContext = createContext<AuthContextValue>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const value: AuthContextValue = {
    user,
    logout: async () => {
      try {
        await axios.post('/v1/auth/logout');
        if (process.env.NODE_ENV === 'development') {
          localStorage.removeItem('token');
        }
      } catch (error) {
        // handle errors
      }
    },
    login: async (email: string, password: string) => {
      try {
        const res = await axios.post<AuthResponsePayload>('/v1/auth/login', {
          email,
          password,
        });
        if (process.env.NODE_ENV === 'development') {
          localStorage.setItem('token', res.data.token);
        }
        setUser(res.data.user);
        return res.data;
      } catch (error) {
        // handle errors
      }
    },
    register: async (
      email: string,
      password: string,
      passwordConfirmation: string
    ) => {
      try {
        const res = await axios.post<AuthResponsePayload>('/v1/auth/register', {
          email,
          password,
          passwordConfirmation,
        });
        if (process.env.NODE_ENV === 'development') {
          localStorage.setItem('token', res.data.token);
        }
        setUser(res.data.user);
        return res.data;
      } catch (error) {
        // handle errors
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext<AuthContextValue>(AuthContext)!;

export default useAuth;
