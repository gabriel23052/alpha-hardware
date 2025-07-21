import { Link } from "react-router";

import classes from "./ProductNotFound.module.css";

const ProductNotFound = () => {
  return (
    <section className={`${classes.productNotFound}`}>
      <h1 className="primary text-verylarge-m">
        Ops! O produto que você busca não está disponível ):
      </h1>
      <p className="dneutral text-default">
        Por favor, verifique a URL ou retorne para a{" "}
        <Link to="/">página inicial</Link>.
      </p>
    </section>
  );
};

export default ProductNotFound;
