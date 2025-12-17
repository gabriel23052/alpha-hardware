import { useRef } from "react";
import { Link } from "react-router";

import SVGUser from "@svg/user.svg?react";

import classes from "./HeaderUserLinks.module.css";

const HeaderUserLinks = () => {
  const user = useRef<string | null>(null); // Improvisado

  return (
    <section
      className={`text-default lneutral-xlight ${classes.headerUserLinks}`}
      id="ariaHeaderUserLinks"
    >
      <SVGUser />
      {user.current === null ? (
        <span>
          <Link className="lneutral-xlight text-default" to="/auth/login">
            Entrar
          </Link>{" "}
          ou <br />
          <Link className="lneutral-xlight text-default" to="/auth/register">
            Cadastrar-se
          </Link>
        </span>
      ) : (
        <span>
          Olá{" "}
          <Link className="lneutral-xlight text-default" to="/">
            {user.current}
          </Link>
          <br />
          Não é você?{" "}
          <Link className="lneutral-xlight text-default" to="/">
            Sair
          </Link>
        </span>
      )}
    </section>
  );
};

export default HeaderUserLinks;
