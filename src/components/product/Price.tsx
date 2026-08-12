import type { TProductPrice } from "../../app.types";

import parsePrice from "@utils/parsePrice";

import classes from "./Price.module.css";

type Props = {
  prices: TProductPrice;
};

const Price = ({ prices }: Props) => {
  return (
    <div className={classes.container}>
      {prices.previous && (
        <p className={`text-default lneutral-dark ${classes.oldPrice}`}>
          R$ {parsePrice(prices.previous)}
        </p>
      )}
      <p className={`text-default lneutral-xdark ${classes.priceWithDiscont}`}>
        <span className="primary-dark">
          R$ <span className="text-price">{parsePrice(prices.pix)}</span>
        </span>{" "}
        no PIX ({prices.pixDiscont}% OFF)
      </p>
      <p className="text-default lneutral-xdark">
        <span className="dneutral-xdark">R$ {parsePrice(prices.full)}</span> no
        cartão
        <br />
        em até{" "}
        <span className="dneutral-xdark">
          {prices.maxInstallments}x de R$ {parsePrice(prices.installments)}
        </span>{" "}
        sem juros
      </p>
    </div>
  );
};

export default Price;
