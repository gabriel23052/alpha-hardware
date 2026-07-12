import { Link } from "react-router";

import notFoundImage from "../assets/img/404.png";

import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <section className={classes.container}>
      <img src={notFoundImage} alt="404 - Página não encontrada" width={200} height={200} />
      <p className="text-verylarge dneutral">Opa! Página não encontrada...</p>
      <Link to="/" className="text-large primary-dark">
        Voltar para o ínicio
      </Link>
    </section>
  );
};

export default NotFound;

