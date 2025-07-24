import ProductBuyPrice from "./ProductBuyPrice";
import classes from "./ProductBuy.module.css";
import { Link } from "react-router";

import SVGCartAdd from "@svg/cartAdd.svg?react";
import SVGFavorite from "@svg/favorite.svg?react";
import ProductFreight from "./ProductFreight";

const ProductBuy = ({ product }: { product: IProduct }) => {
  return (
    <section className={`bg-lneutral-xlight ${classes.productBuy}`}>
      <div className={`${classes.topWrapper}`}>
        <ProductBuyPrice
          prices={product.sale === null ? product.prices : product.sale.prices}
        />
        <div className={`${classes.buttons}`}>
          <Link
            className={`bg-primary lneutral-xlight text-default-b ${classes.buyButton}`}
            to="/"
          >
            COMPRAR
          </Link>
          <button className={`bg-white ${classes.cartButton}`}>
            <SVGCartAdd />
          </button>
          <button className={`${classes.favoriteButton}`}>
            <SVGFavorite />
          </button>
        </div>
      </div>
      <ProductFreight />
    </section>
  );
};

export default ProductBuy;
