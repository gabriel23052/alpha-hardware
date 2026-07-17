import { Link } from "react-router";

import { useSessionStore } from "@stores/useSessionStore";
import useFakeAPI from "@hooks/useFakeAPI";

import SVGUser from "@svg/user.svg?react";

import classes from "./HeaderUserLinks.module.css";
import { toastHandler } from "@utils/toastHandler";

type Props = {
  containerId: string;
};

const REDUCED_USERNAME_LENGTH = 10;

const HeaderUserLinks = ({ containerId }: Props) => {
  const sessionStore = useSessionStore();
  const api = useFakeAPI("POST api/auth/logout");

  const handleExit: React.MouseEventHandler<HTMLAnchorElement> = async (e) => {
    e.preventDefault();
    const response = await api.fetch();
    if (!response.success) {
      toastHandler.fail("Falha ao sair da conta");
      return;
    }
    sessionStore.logout();
    toastHandler.success("Você saiu de sua conta");
  };

  const getReducedUsername = () => {
    if (!sessionStore.isLoggedIn) return "";
    const username = sessionStore.user.username;
    if (username.length <= REDUCED_USERNAME_LENGTH) return username;
    return username.substring(0, REDUCED_USERNAME_LENGTH) + "...";
  };

  return (
    <section
      className={`text-default lneutral-xlight ${classes.container}`}
      id={containerId}
    >
      {api.loading ? (
        <span className={classes.spinner} aria-hidden="true" />
      ) : sessionStore.isLoggedIn ? (
        <>
          <SVGUser title="Autenticação" width={32} height={32} />
          <span>
            Olá{" "}
            <Link
              className="text-default lneutral-xlight"
              to="/dashboard/orders"
              title={sessionStore.user.username}
            >
              {getReducedUsername()}
            </Link>
            <br />
            Não é você?{" "}
            <Link
              className="text-default lneutral-xlight"
              to="/"
              onClick={handleExit}
            >
              Sair
            </Link>
          </span>
        </>
      ) : (
        <>
          <SVGUser title="Autenticação" width={32} height={32} />
          <span>
            <Link className="text-default lneutral-xlight" to="/auth/login">
              Entrar
            </Link>{" "}
            ou <br />
            <Link className="text-default lneutral-xlight" to="/auth/register">
              Cadastrar-se
            </Link>
          </span>
        </>
      )}
    </section>
  );
};

export default HeaderUserLinks;
