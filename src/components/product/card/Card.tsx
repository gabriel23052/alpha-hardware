import { Link } from "react-router";

import Price from "./Price";
import SaleStrip from "../SaleStrip";
import Actions from "./Actions";
import FavoriteButton from "../FavoriteButton";

import classes from "./Card.module.css";
import type { TProduct } from "../../../app.types";

const PRODUCT_THUMB_SIZE = 168;

type Props = {
  product: TProduct["card"];
  mode: "default" | "sale" | "hideActions";
};

const Card = ({ product, mode }: Props) => {
  return (
    <article className={`bg-white ${classes.container}`}>
      <FavoriteButton
        productId={product.id}
        mode="inCard"
        saleOffset={mode === "sale"}
        classname={classes.favoriteButton}
      />
      <Link
        className={classes.link}
        to={`/product/${product.id}`}
        title={product.name}
      >
        {product.sale && mode !== "sale" && (
          <p
            className={`text-default secondary-xdark bg-secondary ${classes.saleDiscont}`}
          >
            - {product.sale.discont}%
          </p>
        )}
        {product.sale && mode === "sale" && (
          <SaleStrip sale={product.sale} mode="card" />
        )}
        <div className={classes.wrapper}>
          <div className={classes.thumb}>
            <img
              src={`/img/products/${product.media.thumb}`}
              alt={product.name}
              width={PRODUCT_THUMB_SIZE}
              height={PRODUCT_THUMB_SIZE}
            />
          </div>
          <p className={`text-small-b dneutral ${classes.name}`}>
            {product.name}
          </p>
        </div>
        <Price prices={product.price} />
      </Link>
      {mode !== "hideActions" && <Actions />}
    </article>
  );
};

export default Card;
