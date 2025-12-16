import { Link } from "react-router";

import ProductCardPrice from "./ProductCardPrice";
import ProductSaleLabel from "./ProductSaleLabel";

import SVGCartAdd from "@svg/cartAdd.svg?react";

import classes from "./ProductCard.module.css";

const PRODUCT_THUMB_WIDTH_HEIGHT = 168;

type Props = {
  product: IProduct;
  hideSale?: boolean;
  hideButtons?: boolean;
};

const ProductCard = ({ product, hideSale, hideButtons }: Props) => {
  return (
    <article className={`bg-white ${classes.container}`} title={product.name}>
      <Link to={`/product/${product.id}`} className={`${classes.link}`}>
        {product.sale && !hideSale && (
          <ProductSaleLabel sale={product.sale} inCard={true} />
        )}
        <div className={`${classes.wrapper}`}>
          <div className={`${classes.thumb}`}>
            <img
              src={`/img/products/${product.media.thumb}`}
              alt={product.name}
              width={PRODUCT_THUMB_WIDTH_HEIGHT}
              height={PRODUCT_THUMB_WIDTH_HEIGHT}
            />
          </div>
          <span className={`dneutral text-small-b ${classes.name}`}>
            {product.name}
          </span>
        </div>
        <ProductCardPrice
          prices={product.prices}
          showOldPrice={hideSale === false}
        />
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
