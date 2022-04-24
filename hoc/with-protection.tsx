import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../contexts/auth";

export const withProtection = (Component: React.FC) => {
  const ProtectedComponent: React.FC = (props) => {
    const { ready, user } = useAuth();
    const { replace } = useRouter();

    if (!ready) {
      return null;
    }

    if (ready && user) {
      return <Component />;
    } else {
      replace('/login');
      return null;
    }
  }

  return ProtectedComponent;
};