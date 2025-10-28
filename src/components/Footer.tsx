import { Link } from "react-router";

import SVGLogo from "@svg/logo.svg?react";
import SVGInstagramDark from "@svg/instagramDark.svg?react";
import SVGXDark from "@svg/xDark.svg?react";
import SVGFacebookDark from "@svg/facebookDark.svg?react";

import classes from "./Footer.module.css";

const CATEGORIES = [
  { name: "gpu", label: "Placas de Vídeo" },
  { name: "moba", label: "Placas-mãe" },
  { name: "cpu", label: "Processadores" },
  { name: "ram", label: "Memórias RAM" },
  { name: "ssd", label: "SSD's" },
  { name: "hdd", label: "HD's" },
];

const Footer = () => {
  return (
    <footer className={`bg-dneutral-dark ${classes.footer}`}>
      <div className={`defaultContainer ${classes.gridContainer}`}>
        <nav className={`${classes.categories}`}>
          <h3 className="secondary text-large">Departamentos</h3>
          <ul className="text-default">
            {CATEGORIES.map(({ name, label }) => (
              <li key={name}>
                <Link className="white" to={`/products?category=${name}`}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className={`${classes.institutional}`}>
          <h3 className="secondary text-large">Institucional</h3>
          <ul className="text-default">
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
