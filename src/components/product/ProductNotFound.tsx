import { Link } from "react-router";

import classes from "./ProductNotFound.module.css";

const ProductNotFound = () => {
  return (
    <section className={`defaultContainer ${classes.productNotFound}`}>
      <h1 className="text-verylarge-m primary">
        Ops! O produto que você busca não está disponível ):
      </h1>
      <p className="text-default dneutral">
        Por favor, verifique a URL ou retorne para a{" "}
        <Link to="/">página inicial</Link>.
      </p>
    </section>
  );
};

export default ProductNotFound;
