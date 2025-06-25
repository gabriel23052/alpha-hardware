import { Link } from "react-router";
import classes from "./styles/Footer.module.css";

import SVGLogo from "../assets/svg/logo.svg?react";
import SVGInstagramDark from "../assets/svg/instagramDark.svg?react";
import SVGXDark from "../assets/svg/xDark.svg?react";
import SVGFacebookDark from "../assets/svg/facebookDark.svg?react";

const Footer = () => {
  return (
    <footer className={`bg-dneutral-dark ${classes.footer}`}>
      <div className={`defaultContainer ${classes.gridContainer}`}>
        <nav className={`${classes.categories}`}>
          <h3 className="secondary text-large">Departamentos</h3>
          <ul className="text-default">
            <li>
              <Link className="white" to={"/"}>
                Placas de Vídeo
              </Link>
            </li>
            <li>
              <Link className="white" to={"/"}>
                Placas-Mãe
              </Link>
            </li>
            <li>
              <Link className="white" to={"/"}>
                Processadores
              </Link>
            </li>
            <li>
              <Link className="white" to={"/"}>
                Memórias RAM
              </Link>
            </li>
            <li>
              <Link className="white" to={"/"}>
                SSDs
              </Link>
            </li>
            <li>
              <Link className="white" to={"/"}>
                HDs
              </Link>
            </li>
          </ul>
        </nav>
        <nav className={`${classes.institutional}`}>
          <h3 className="secondary text-large">Institucional</h3>
          <ul className={`text-default`}>
            <li>
              <Link className="white" to={"/"}>
                Sobre a Alpha Hardware
              </Link>
            </li>
            <li>
              <Link className="white" to={"/"}>
                Políticas de Privacidade
              </Link>
            </li>
            <li>
              <Link className="white" to={"/"}>
                Políticas de Cookies
              </Link>
            </li>
            <li>
              <Link className="white" to={"/"}>
                Políticas de Devolução
              </Link>
            </li>
          </ul>
        </nav>
        <section className={`${classes.social}`}>
          <div>
            <h3 className="secondary text-large">Mídias Sociais</h3>
            <div className={`${classes.links}`}>
              <a className="bg-dneutral-xlight" href="/">
                <SVGInstagramDark />
              </a>
              <a className="bg-dneutral-xlight" href="/">
                <SVGXDark />
              </a>
              <a className="bg-dneutral-xlight" href="/">
                <SVGFacebookDark />
              </a>
            </div>
          </div>
          <SVGLogo />
        </section>
      </div>
      <span className={`lneutral-dark text-default ${classes.legalInfo}`}>
        Todos os direitos reservados
      </span>
    </footer>
  );
};

export default Footer;
