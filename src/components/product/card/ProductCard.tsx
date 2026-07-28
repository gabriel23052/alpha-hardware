import { Link } from "react-router";

import ProductCardPrice from "./ProductCardPrice";
import ProductSaleStrip from "../ProductSaleStrip";
import ProductCardActions from "./ProductCardActions";
import ProductFavoriteButton from "../ProductFavoriteButton";

import classes from "./ProductCard.module.css";

const PRODUCT_THUMB_SIZE = 168;

type Props = {
  product: IProduct_Card;
  mode: "default" | "sale" | "hideActions";
};

const ProductCard = ({ product, mode }: Props) => {
  return (
    <article className={`bg-white ${classes.container}`}>
      <ProductFavoriteButton
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
          <ProductSaleStrip sale={product.sale} mode="card" />
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
        <ProductCardPrice prices={product.price} />
      </Link>
      {mode !== "hideActions" && <ProductCardActions />}
    </article>
  );
};

export default ProductCard;
