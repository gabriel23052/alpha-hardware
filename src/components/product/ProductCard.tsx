import { Link } from "react-router";

import ProductCardPrice from "./ProductCardPrice";

import SVGCartAdd from "@svg/cartAdd.svg?react";

import classes from "./ProductCard.module.css";
import ProductSaleLabel from "./ProductSaleLabel";

type ProductCardProps = {
  product: IProduct;
  showSale: boolean;
  showButtons?: boolean;
};

const ProductCard = ({ product, showSale, showButtons }: ProductCardProps) => {
  return (
    <article className={`bg-white ${classes.productCard}`}>
      <Link to={`/product/${product.id}`}>
        {product.sale && showSale && (
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
            showOldPrice={showSale}
          />
        </div>
      </Link>
      {showButtons && (
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
