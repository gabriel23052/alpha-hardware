import type { TProduct } from "../../app.types";

import Price from "./Price";
import Freight from "./Freight";
import SaleStrip from "./SaleStrip";
import FavoriteButton from "./FavoriteButton";
import Actions from "./Actions";

import classes from "./CheckoutInfo.module.css";

type Props = {
  product: TProduct["default"];
};

const CheckoutInfo = ({ product }: Props) => {
  return (
    <section className="bg-lneutral-xlight">
      {product.sale && <SaleStrip sale={product.sale} mode="fullPage" />}
      <div className={classes.wrapper}>
        <div className={classes.topWrapper}>
          <Price prices={product.price} />
          <div className={classes.buttons}>
            <Actions mode="checkoutInfo" />
            <FavoriteButton productId={product.id} mode="default" />
          </div>
        </div>
        <Freight />
      </div>
    </section>
  );
};

export default CheckoutInfo;
