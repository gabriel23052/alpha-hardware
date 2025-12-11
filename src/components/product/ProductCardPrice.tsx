import parsePrice from "@utils/parsePrice";

import classes from "./ProductCardPrice.module.css";

interface Props {
  prices: IPrices;
  showOldPrice: boolean;
}

const ProductCardPrice = ({ prices, showOldPrice }: Props) => {
  return (
    <div className={`${classes.container}`}>
      {prices.previous && showOldPrice && (
        <span className={`dneutral-xlight text-default ${classes.oldPrice}`}>
          R$ {parsePrice(prices.previous)}
        </span>
      )}
      <span className={`lneutral-xdark text-small ${classes.price}`}>
        R$
        <span className={`dneutral-dark text-large-m`}>
          {" "}
          {parsePrice(prices.pix)}{" "}
        </span>
        no PIX ({prices.pixDiscont}% OFF)
      </span>
      <span className={`lneutral-xdark text-small`}>
        R$
        <span className="dneutral-dark text-default">
          {" "}
          {parsePrice(prices.full)}{" "}
        </span>
        no cartão <br /> em até {prices.maxInstallments}x de R$
        <span className="dneutral-dark text-default">
          {" "}
          {parsePrice(prices.installments)}
        </span>
      </span>
    </div>
  );
};

export default ProductCardPrice;
