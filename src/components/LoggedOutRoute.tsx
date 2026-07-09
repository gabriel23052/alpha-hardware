import type { ReactNode } from "react";
import { Navigate } from "react-router";

import { useSessionStore } from "@stores/useSessionStore";

type Props = {
  redirectTo: string;
  children: ReactNode;
};

const LoggedOutRoute = ({ redirectTo, children }: Props) => {
  const sessionStore = useSessionStore();

  if (sessionStore.isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return children
};

export default LoggedOutRoute;
