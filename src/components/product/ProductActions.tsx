import { Link } from "react-router";

import ProductActionsPrice from "./ProductActionsPrice";
import ProductFreight from "./ProductFreight";
import ProductSaleStrip from "./ProductSaleStrip";

import SVGCartAdd from "@svg/cartAdd.svg?react";
import SVGFavorite from "@svg/favorite.svg?react";

import classes from "./ProductActions.module.css";

type Props = {
  product: IProduct_Full;
};

const ProductActions = ({ product }: Props) => {
  return (
    <section className="bg-lneutral-xlight">
      {product.sale && <ProductSaleStrip sale={product.sale} mode="fullPage" />}
      <div className={classes.wrapper}>
        <div className={classes.topWrapper}>
          <ProductActionsPrice prices={product.prices} />
          <div className={`${classes.buttons}`}>
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
              <SVGCartAdd aria-hidden="true" />
            </button>
            <button
              className={classes.favoriteButton}
              title="Adicionar aos favoritos"
            >
              <SVGFavorite aria-hidden="true" />
            </button>
          </div>
        </div>
        <ProductFreight />
      </div>
    </section>
  );
};

export default ProductActions;
