import React from "react";

import classes from "./ProductCardSaleLabel.module.css";

const ProductCardSaleLabel = ({ sale }: { sale: ISale }) => {
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

  return (
    <div>
      {saleTime > 0 ? (
        <div
          className={`bg-secondary secondary-xdark text-default ${classes.sale}`}
        >
          <span>
            <span className="text-large-m">{sale.discontPercentage}%</span> OFF
          </span>
          <span className="text-default">{getPeriodString(saleTime)}</span>
        </div>
      ) : (
        <div
          className={`text-default lneutral-xdark ${classes.sale} ${classes.expired}`}
        >
          Promoção expirada
        </div>
      )}
    </div>
  );
};

export default ProductCardSaleLabel;
