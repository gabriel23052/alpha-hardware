import { Link } from "react-router";

import type { TProduct } from "../../app.types";

import Price from "./Price";
import Freight from "./Freight";
import SaleStrip from "./SaleStrip";
import FavoriteButton from "./FavoriteButton";

import SVGCartAdd from "@svg/cartAdd.svg?react";

import classes from "./Actions.module.css";

type Props = {
  product: TProduct["default"];
};

const Actions = ({ product }: Props) => {
  return (
    <section className="bg-lneutral-xlight">
      {product.sale && <SaleStrip sale={product.sale} mode="fullPage" />}
      <div className={classes.wrapper}>
        <div className={classes.topWrapper}>
          <Price prices={product.price} />
          <div className={classes.buttons}>
            <Link
              className={`text-default-b bg-primary lneutral-xlight ${classes.buyButton}`}
              to="/"
            >
              COMPRAR
            </Link>
            <button
              className={`bg-white ${classes.cartButton}`}
              title="Adicionar ao carrinho"
            >
              <SVGCartAdd aria-hidden="true" width={36} height={24} />
            </button>
            <FavoriteButton productId={product.id} mode="default" />
          </div>
        </div>
        <Freight />
      </div>
    </section>
  );
};

export default Actions;
