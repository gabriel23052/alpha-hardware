import parsePrice from "@utils/parsePrice";

import classes from "./ProductBuyPrice.module.css";

const ProductBuyPrice = ({ prices }: { prices: IPrices }) => {
  return (
    <div className={`${classes.productBuyPrice}`}>
      <span className={`lneutral-xdark text-default ${classes.priceWithDiscont}`}>
        <span className="primary-dark">
          R${" "}
          <span className="text-price">{parsePrice(prices.withDiscont)}</span>
        </span>{" "}
        no PIX ({prices.discontPercentage}% OFF)
      </span>
      <span className="lneutral-xdark text-default">
        <span className="dneutral-xdark">R$ {parsePrice(prices.normal)}</span>{" "}
        no cartão
        <br />
        em até{" "}
        <span className="dneutral-xdark">
          {prices.maxInstallments}x de R$ {parsePrice(prices.installments)}
        </span>{" "}
        sem juros
      </span>
    </div>
  );
};

export default ProductBuyPrice;
