import useFakeAPI from "@hooks/useFakeAPI";
import { useSessionStore } from "@stores/useSessionStore";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { favorites } from "../features/favorites";

const SessionValidator = () => {
  const api = useFakeAPI<null>("POST api/auth/verifySession");
  const sessionStore = useSessionStore();
  const location = useLocation();

  useEffect(() => {
    const fetch = async () => {
      const response = await api.fetch();
      if (
        !response.success &&
        response.error.message === "Seção inexistente ou inválida"
      ) {
        sessionStore.logout();
        favorites.clear();
      }
    };
    if (sessionStore.isLoggedIn) {
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return null;
};

export default SessionValidator;
