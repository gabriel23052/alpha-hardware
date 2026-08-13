import { Link } from "react-router";

import type { TProduct } from "../../../app.types";

import Actions from "../Actions";
import Price from "./Price";

import classes from "./Favorite.module.css";

type Props = {
  product: TProduct["card"];
  remove: (productId: string) => void;
};

const Favorite = ({ product, remove }: Props) => {
  return (
    <article className={classes.container}>
      <img
        className={classes.thumb}
        width={150}
        height={150}
        src={`/img/products/${product.media.thumb}`}
        alt={product.name}
      />
      <Link className={classes.title} to={`/product/${product.id}`}>
        <h2 className={`text-default-b`}>{product.name}</h2>
      </Link>
      <Price prices={product.price} hidePreviousPrice={true} />
      <Link
        className={`text-small primary-dark ${classes.removeLink}`}
        to="/"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          remove(product.id);
        }}
      >
        Remover
      </Link>
      <Actions className={classes.actions} mode="card" />
    </article>
  );
};

export default Favorite;
