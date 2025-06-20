import React from "react";
import { Link } from "react-router";

import svgUser from "../assets/svg/user.svg";

const HeaderUserLinks = () => {
  const user = React.useRef<string | null>("Gabriel"); // Improvisado

  return (
    <section>
      <img src={svgUser} />
      {user.current === null ? (
        <span>
          <Link to="/">Entrar</Link>
          <br />
          ou <Link to="/">Cadastrar-se</Link>
        </span>
      ) : (
        <span>
          Olá <Link to="/">{user.current}</Link>
          <br />
          Não é você? <Link to="/">Sair</Link>
        </span>
      )}
    </section>
  );
};

export default HeaderUserLinks;
