import { Link } from "react-router";

import SVGLogo from "@svg/logo.svg?react";

import { CATEGORIES, INSTITUTIONAL_LINKS, SOCIAL_MEDIA } from "../config";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`bg-dneutral-dark ${classes.container}`}>
      <div className={`defaultContainer ${classes.gridContainer}`}>
        <nav className={`${classes.categories}`}>
          <h3 className="text-large secondary ">Departamentos</h3>
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
          <h3 className="text-large secondary">Institucional</h3>
          <ul className="text-default">
            {INSTITUTIONAL_LINKS.map(({ name, to }) => (
              <li key={name}>
                <Link className="white" to={to}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <section className={classes.social}>
          <h3 className="text-large secondary">Mídias Sociais</h3>
          <ul>
            {SOCIAL_MEDIA.map((socialMedia) => (
              <li key={socialMedia.name}>
                <a
                  className="bg-dneutral-xlight"
                  href={socialMedia.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={socialMedia.name}
                >
                  <socialMedia.svgDark
                    aria-hidden="true"
                    width={32}
                    height={32}
                  />
                </a>
              </li>
            ))}
          </ul>
          <SVGLogo
            className={classes.logo}
            aria-hidden="true"
            width={192}
            height={74}
          />
        </section>
      </div>
      <p className={`text-default lneutral-dark ${classes.legalInfo}`}>
        Todos os direitos reservados
      </p>
    </footer>
  );
};

export default Footer;
