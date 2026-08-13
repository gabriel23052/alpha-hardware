import type { TProductPrice } from "../../../app.types";

import parsePrice from "@utils/parsePrice";

import classes from "./Price.module.css";

interface Props {
  className?: string;
  prices: TProductPrice;
  hidePreviousPrice?: boolean;
}

const Price = ({ className, prices, hidePreviousPrice }: Props) => {
  return (
    <div className={`${classes.container} ${className || ""}`}>
      {!hidePreviousPrice && (
        <p className={`text-default dneutral-xlight ${classes.oldPrice}`}>
          {prices.previous ? `R$ ${parsePrice(prices.previous)}` : ""}
        </p>
      )}
      <p className={`text-small lneutral-xdark ${classes.price}`}>
        R$
        <span className="text-large-m dneutral-dark">
          {" "}
          {parsePrice(prices.pix)}{" "}
        </span>
        no PIX ({prices.pixDiscont}% OFF)
      </p>
      <p className="text-small lneutral-xdark">
        R$
        <span className="text-default dneutral-dark">
          {" "}
          {parsePrice(prices.full)}{" "}
        </span>
        no cartão <br /> em até {prices.maxInstallments}x de R$
        <span className="text-default dneutral-dark">
          {" "}
          {parsePrice(prices.installments)}
        </span>
      </p>
    </div>
  );
};

export default Price;
