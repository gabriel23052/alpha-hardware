import { Link } from "react-router";

import ProductCardPrice from "./ProductCardPrice";

import SVGCartAdd from "@svg/cartAdd.svg?react";

import classes from "./ProductCard.module.css";
import ProductCardSaleLabel from "./ProductCardSaleLabel";

type ProductCardProps = { product: IProduct; buttons?: boolean };

const ProductCard = ({ product, buttons }: ProductCardProps) => {
  return (
    <article className={`${classes.productCard}`}>
      <Link to="/">
        {product.sale && <ProductCardSaleLabel sale={product.sale} />}
        <div className={`${classes.thumb}`}>
          <img
            src={`./img/products/${product.media.thumb}`}
            alt={product.name}
          />
        </div>
        <div className={`${classes.wrapper}`}>
          <span className={`dneutral text-small-b ${classes.name}`}>
            {product.name}
          </span>
          <ProductCardPrice prices={product.prices} />
        </div>
      </Link>
      {buttons && (
        <div className={`${classes.buttonsContainer}`}>
          <Link to="" className="lneutral-xlight bg-primary text-default-b">
            COMPRAR
          </Link>
          <button className="bg-lneutral-xlight">
            <SVGCartAdd />
          </button>
        </div>
      )}
    </article>
  );
};

export default ProductCard;
