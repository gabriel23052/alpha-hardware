import React from "react";
import { Link } from "react-router";

import ProductPrice from "./ProductPrice";
import ProductCardPrice from "./ProductCardPrice";
import ProductOldPrice from "./ProductOldPrice";

import SVGCartAdd from "@svg/cartAdd.svg?react";

import classes from "./ProductCard.module.css";

type ProductCardProps = { product: IProduct; buttons?: boolean };

const ProductCard = ({ product, buttons }: ProductCardProps) => {
  const [saleTime, setSaleTime] = React.useState(0);

  const getPeriodString = (period: number) => {
    const SEC_IN_DAY = 86400;
    const SEC_IN_HR = 3600;
    const day = Math.floor(period / SEC_IN_DAY);
    period -= day * SEC_IN_DAY;
    const hr = Math.floor(period / SEC_IN_HR);
    period -= hr * SEC_IN_HR;
    const min = Math.floor(period / 60);
    const sec = period % 60;
    return `${day}d ${hr.toString().padStart(2, "0")}h ${min
      .toString()
      .padStart(2, "0")}m ${sec.toString().padStart(2, "0")}s`;
  };

  React.useEffect(() => {
    if (!product.sale) return;
    const date = new Date();
    let time = Math.floor(
      (product.sale.expiration * 1000 - date.getTime()) / 1000
    );
    if (time <= 0) return;
    setSaleTime(time);
    const interval = setInterval(() => {
      time--;
      setSaleTime(time);
      if (time <= 0) {
        setSaleTime(0);
        clearInterval(interval);
      }
    }, 1000);
  }, [product.sale]);

  if (product.sale === null)
    return (
      <article className={`${classes.productCard}`}>
        <Link to="/">
          <div className={`${classes.thumb}`}>
            <img
              src={`./img/products/${product.media.thumb}`}
              alt={product.name}
            />
          </div>
          <div className={`${classes.wrapper}`}>
            <span className={`dneutral text-small-b ${classes.name}`}>
              {product.name}
            </span>
            <ProductPrice
              className={`${classes.price}`}
              price={product.prices.withDiscont}
              cashDiscount={product.prices.discontPercentage}
            />
            <ProductCardPrice
              cardPrice={product.prices.normal}
              installmentsPrice={product.prices.installments}
              maxInstallments={product.prices.maxInstallments}
            />
          </div>
        </Link>
        <div className={`${classes.buttonsContainer}`}>
          <Link to="" className="lneutral-xlight bg-primary text-default-b">
            COMPRAR
          </Link>
          <button className="bg-lneutral-xlight">
            <SVGCartAdd />
          </button>
        </div>
      </article>
    );

  return (
    <article className={`${classes.productCard}`}>
      <Link to="/">
        {saleTime > 0 ? (
          <div
            className={`bg-secondary secondary-xdark text-default ${classes.sale}`}
          >
            <span>
              <span className="text-large-m">
                {product.sale.discontPercentage}%
              </span>{" "}
              OFF
            </span>
            <span>{getPeriodString(saleTime)}</span>
          </div>
        ) : (
          <div
            className={`text-default lneutral-xdark ${classes.sale} ${classes.expired}`}
          >
            Promoção expirada
          </div>
        )}
        <div className={`${classes.thumb}`}>
          <img
            src={`./img/products/${product.media.thumb}`}
            alt={product.name}
          />
        </div>
        <div className={`${classes.wrapper}`}>
          <span className={`dneutral text-small-b ${classes.name}`}>
            {product.name}
          </span>
          <ProductOldPrice
            oldPrice={product.sale.prices.oldPrice || product.prices.normal}
          />
          <ProductPrice
            className={`${classes.price}`}
            price={product.sale.prices.withDiscont}
            cashDiscount={product.sale.prices.discontPercentage}
          />
          <ProductCardPrice
            cardPrice={product.sale.prices.normal}
            installmentsPrice={product.sale.prices.installments}
            maxInstallments={product.sale.prices.maxInstallments}
          />
        </div>
      </Link>
      {buttons && (
        <div className={`${classes.buttonsContainer}`}>
          <Link to="" className="lneutral-xlight bg-primary text-default-b">
            COMPRAR
          </Link>
          <button className="bg-lneutral-xlight">
            <SVGCartAdd />
          </button>
        </div>
      )}
    </article>
  );
};

export default ProductCard;
