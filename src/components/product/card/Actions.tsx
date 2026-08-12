import { Link } from "react-router";

import SVGCartAdd from "@svg/cartAdd.svg?react";

import classes from "./Actions.module.css";

const Actions = () => {
  return (
    <div className={classes.container}>
      <Link to="" className="text-default-b lneutral-xlight bg-primary">
        COMPRAR
      </Link>
      <button className="bg-lneutral-xlight">
        <SVGCartAdd width={36} height={24} title="Adicionar ao carrinho" />
      </button>
    </div>
  );
};

export default Actions;
