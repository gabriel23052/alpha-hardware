import parsePrice from "@utils/parsePrice";

import classes from "./ProductBuyPrice.module.css";

const ProductBuyPrice = ({ prices }: { prices: IPrices }) => {
  return (
    <div className={`${classes.productBuyPrice}`}>
      {prices.previous && (
        <span className={`lneutral-dark text-default ${classes.oldPrice}`}>
          R$ {parsePrice(prices.previous)}
        </span>
      )}
      <span
        className={`lneutral-xdark text-default ${classes.priceWithDiscont}`}
      >
        <span className="primary-dark">
          R$ <span className="text-price">{parsePrice(prices.pix)}</span>
        </span>{" "}
        no PIX ({prices.pixDiscont}% OFF)
      </span>
      <span className="lneutral-xdark text-default">
        <span className="dneutral-xdark">R$ {parsePrice(prices.full)}</span> no
        cartão
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
