import { SOCIAL_MEDIA } from "../../config";

import classes from "./HomeSocial.module.css";

const HomeSocial = () => {
  return (
    <section className={`defaultContainer ${classes.container}`}>
      <div className={classes.title}>
        <h2 className="text-verylarge-m primary">
          Acompanhe a Alpha Hardware nas redes sociais
        </h2>
        <p className="text-default dneutral-xlight ">
          Lá nós compartilhamos produtos novos, cupons e novidades, além disso,
          sorteamos peças todos os meses por lá!
        </p>
      </div>
      <ul className={`text-large ${classes.links}`}>
        {SOCIAL_MEDIA.map((socialMedia) => (
          <li key={socialMedia.id}>
            <a
              href={socialMedia.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={classes.icon}
                style={{ background: socialMedia.background }}
                aria-hidden="true"
              >
                <socialMedia.svg width={40} height={40} />
              </div>
              <p className={`bg-lneutral-xlight ${classes.id}`}>
                {socialMedia.id}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HomeSocial;
