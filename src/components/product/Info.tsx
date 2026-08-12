import UnderlinedTitle from "@components/ui/UnderlinedTitle";

import classes from "./Info.module.css";

type Props = {
  description: string;
  specs: [string, string][];
};

const Info = ({ description, specs }: Props) => {
  return (
    <section className={classes.container}>
      <div className={classes.description}>
        <UnderlinedTitle className={classes.descTitle} align="left">
          Descrição
        </UnderlinedTitle>
        <p className="text-default dneutral">{description}</p>
      </div>
      <div className={classes.spec}>
        <UnderlinedTitle className={classes.specTitle} align="left">
          Ficha técnica
        </UnderlinedTitle>
        <dl>
          {specs.map(([key, value]) => (
            <div key={`${key}-${value}`}>
              <dt className="text-default-b dneutral-dark">{key}</dt>
              <dd className="text-default dneutral">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Info;
