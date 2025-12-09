import React from "react";

import classes from "./ProductSaleLabel.module.css";

type Props = {
  sale: IProductSale;
  inCard: boolean;
};

const ProductSaleLabel = ({ sale, inCard }: Props) => {
  const [saleTime, setSaleTime] = React.useState(0);

  const getPeriodString = (period: number) => {
    const SEC_IN_HR = 3600;
    const hr = Math.floor(period / SEC_IN_HR);
    period -= hr * SEC_IN_HR;
    const min = Math.floor(period / 60);
    const sec = period % 60;
    return `${hr}h ${min.toString().padStart(2, "0")}m ${sec
      .toString()
      .padStart(2, "0")}s`;
  };

  React.useEffect(() => {
    const date = new Date();
    let time = Math.floor((sale.expiration * 1000 - date.getTime()) / 1000);
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
    return () => clearInterval(interval);
  }, [sale]);

  if (saleTime > 0)
    return (
      <div
        className={`bg-secondary secondary-xdark text-default ${classes.sale} ${
          inCard ? classes.inCard : ""
        }`}
      >
        <span>
          <span className="text-large-m">{sale.discont}%</span> OFF
        </span>
        <span className="text-default">{getPeriodString(saleTime)}</span>
      </div>
    );

  return (
    <div
      className={`text-default lneutral-xdark ${classes.sale} ${classes.expired}`}
    >
      Promoção expirada
    </div>
  );
};

export default ProductSaleLabel;
