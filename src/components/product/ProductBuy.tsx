import { Link } from "react-router";

import ProductBuyPrice from "./ProductBuyPrice";
import ProductFreight from "./ProductFreight";
import ProductSaleLabel from "./ProductSaleLabel";

import SVGCartAdd from "@svg/cartAdd.svg?react";
import SVGFavorite from "@svg/favorite.svg?react";

import classes from "./ProductBuy.module.css";

const ProductBuy = ({ product }: { product: IProduct }) => {
  return (
    <section className={`bg-lneutral-xlight ${classes.productBuy}`}>
      {product.sale && (
        <div className={`${classes.sale}`}>
          <h2 className="secondary bg-dneutral text-display">
            {product.sale.name}
          </h2>
          <ProductSaleLabel sale={product.sale} inCard={false} />
        </div>
      )}
      <div className={`${classes.container}`}>
        <div className={`${classes.topWrapper}`}>
          <ProductBuyPrice prices={product.prices} />
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
      </div>
    </section>
  );
};

export default ProductBuy;
