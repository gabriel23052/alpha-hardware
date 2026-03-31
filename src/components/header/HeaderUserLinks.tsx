import { useRef } from "react";
import { Link } from "react-router";

import SVGUser from "@svg/user.svg?react";

import classes from "./HeaderUserLinks.module.css";

type Props = {
  id: string;
};

const HeaderUserLinks = ({ id }: Props) => {
  const user = useRef<string | null>(null); // Improvisado

  return (
    <section
      className={`text-default lneutral-xlight ${classes.container}`}
      id={id}
    >
      <SVGUser title="Autenticação" width={32} height={32} />
      {user.current === null ? (
        <span>
          <Link className="text-default lneutral-xlight" to="/auth/login">
            Entrar
          </Link>{" "}
          ou <br />
          <Link className="text-default lneutral-xlight" to="/auth/register">
            Cadastrar-se
          </Link>
        </span>
      ) : (
        <span>
          Olá{" "}
          <Link className="text-default lneutral-xlight" to="/">
            {user.current}
          </Link>
          <br />
          Não é você?{" "}
          <Link className="text-default lneutral-xlight" to="/">
            Sair
          </Link>
        </span>
      )}
    </section>
  );
};

export default HeaderUserLinks;
