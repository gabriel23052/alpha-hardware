import UnderlinedTitle from "@components/UnderlinedTitle";

import classes from "./ProductInfo.module.css";

const ProductInfo = () => {
  return (
    <div className={classes.container}>
      <div className={classes.description}>
        <UnderlinedTitle className={classes.descTitle} align="left">
          Descrição
        </UnderlinedTitle>
        <p className="text-default dneutral">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean velit
          nibh, congue sit amet porttitor a, congue ut mi. Morbi quis porta ex.
          Integer purus nisi, ultricies elementum diam ac, lobortis efficitur
          dolor. Mauris feugiat finibus purus, quis porttitor orci commodo sed.
          Vestibulum eget turpis sed sapien imperdiet elementum. Cras vitae
          dolor
        </p>
      </div>
      <div className={classes.spec}>
        <UnderlinedTitle className={classes.specTitle} align="left">
          Ficha técnica
        </UnderlinedTitle>
        <dl>
          <div>
            <dt className="text-default-b dneutral-dark ">Chave</dt>
            <dd className="text-default dneutral">Valor</dd>
          </div>
          <div>
            <dt className="text-default-b dneutral-dark ">Chave</dt>
            <dd className="text-default dneutral">Valor</dd>
          </div>
          <div>
            <dt className="text-default-b dneutral-dark">Chave</dt>
            <dd className="text-default dneutral">Valor</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ProductInfo;
