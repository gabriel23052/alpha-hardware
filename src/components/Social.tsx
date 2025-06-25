import classes from "./styles/Social.module.css";

import SVGInstagram from "../assets/svg/instagram.svg?react";
import SVGX from "../assets/svg/x.svg?react";
import SVGFacebook from "../assets/svg/facebook.svg?react";

const Social = () => {
  return (
    <section className={`defaultContainer ${classes.social}`}>
      <div className={`${classes.text}`}>
        <h2 className="primary text-verylarge-m">
          Acompanhe a Alpha Hardware nas redes sociais
        </h2>
        <p className="dneutral-xlight text-default">
          Lá nós compartilhamos produtos novos, cupons e novidades, além disso,
          sorteamos peças todos os meses por lá!
        </p>
      </div>
      <div className={`${classes.socialMedia}`}>
        <ul className={`text-large ${classes.list}`}>
          <li>
            <a href="/">
              <div className={`${classes.instagram}`}>
                <SVGInstagram />
              </div>
              <span className="bg-lneutral-xlight dneutral">
                @alpha.hardware
              </span>
            </a>
          </li>
          <li>
            <a href="/">
              <div className={`${classes.x}`}>
                <SVGX />
              </div>
              <span className="bg-lneutral-xlight dneutral">
                @AlphaHardware
              </span>
            </a>
          </li>
          <li>
            <a href="/">
              <div className={`${classes.facebook}`}>
                <SVGFacebook />
              </div>
              <span className="bg-lneutral-xlight dneutral">
                Alpha Hardware
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Social;
