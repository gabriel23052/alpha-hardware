import parsePrice from "@utils/parsePrice";

import classes from "./ProductCardPrice.module.css";

interface ProductCardPriceProps {
  prices: IPrices;
  showOldPrice: boolean;
}

const ProductCardPrice = ({ prices, showOldPrice }: ProductCardPriceProps) => {
  return (
    <>
      {prices.oldPrice && showOldPrice && (
        <span className={`dneutral-xlight text-default ${classes.oldPrice}`}>
          R$ {parsePrice(prices.oldPrice)}
        </span>
      )}
      <span className={`lneutral-xdark text-small ${classes.price}`}>
        R$
        <span className="dneutral-dark text-large-m">
          {" "}
          {parsePrice(prices.withDiscont)}{" "}
        </span>
        no PIX ({prices.discontPercentage}% OFF)
      </span>
      <span className={`lneutral-xdark text-small`}>
        R$
        <span className="dneutral-dark text-default">
          {" "}
          {parsePrice(prices.normal)}{" "}
        </span>
        no cartão <br /> em até {prices.maxInstallments}x de R$
        <span className="dneutral-dark text-default">
          {" "}
          {parsePrice(prices.installments)}
        </span>
      </span>
    </>
  );
};

export default ProductCardPrice;
