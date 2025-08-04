import { Link } from "react-router";

import ProductCardPrice from "./ProductCardPrice";
import ProductSaleLabel from "./ProductSaleLabel";

import SVGCartAdd from "@svg/cartAdd.svg?react";

import classes from "./ProductCard.module.css";

type ProductCardProps = {
  product: IProduct;
  hideSale?: boolean;
  hideButtons?: boolean;
};

const ProductCard = ({ product, hideSale, hideButtons }: ProductCardProps) => {
  return (
    <article className={`bg-white ${classes.productCard}`}>
      <Link to={`/product/${product.id}`}>
        {product.sale && !hideSale && (
          <ProductSaleLabel sale={product.sale} inCard={true} />
        )}
        <div className={`${classes.thumb}`}>
          <img
            src={`/img/products/${product.media.thumb}`}
            alt={product.name}
          />
        </div>
        <div className={`${classes.wrapper}`}>
          <span className={`dneutral text-small-b ${classes.name}`}>
            {product.name}
          </span>
          <ProductCardPrice
            prices={product.sale ? product.sale.prices : product.prices}
            showOldPrice={hideSale === false}
          />
        </div>
      </Link>
      {!hideButtons && (
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
