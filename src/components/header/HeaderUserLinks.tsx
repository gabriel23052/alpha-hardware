import React from "react";
import { Link } from "react-router";

import SVGUser from "@svg/user.svg?react";

import classes from "./HeaderUser.module.css";

const HeaderUserLinks = () => {
  const user = React.useRef<string | null>("Gabriel"); // Improvisado

  return (
    <section
      className={`text-default lneutral-xlight ${classes.headerUserLinks}`}
    >
      <SVGUser />
      {user.current === null ? (
        <span>
          <Link className="lneutral-xlight text-default-b" to="/">
            Entrar
          </Link>{" "}
          ou <br />
          <Link className="lneutral-xlight text-default-b" to="/">
            Cadastrar-se
          </Link>
        </span>
      ) : (
        <span>
          Olá{" "}
          <Link className="lneutral-xlight text-default-b" to="/">
            {user.current}
          </Link>
          <br />
          Não é você?{" "}
          <Link className="lneutral-xlight text-default-b" to="/">
            Sair
          </Link>
        </span>
      )}
    </section>
  );
};

export default HeaderUserLinks;
