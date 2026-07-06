import { useEffect, useState } from "react";
import { Link } from "react-router";

import { timeRemaining } from "@utils/timeRemaining";

import classes from "./ProductSaleStrip.module.css";

type Props = {
  sale: IProductSale;
  mode: "card" | "fullPage";
};

const ProductSaleStrip = ({ sale, mode }: Props) => {
  const [saleTime, setSaleTime] = useState(timeRemaining(sale.expiration));

  useEffect(() => {
    const interval = setInterval(() => {
      setSaleTime(timeRemaining(sale.expiration));
    }, 1000);
    return () => clearInterval(interval);
  }, [sale]);

  if (mode === "card") {
    return (
      <div
        className={`text-default secondary-xdark ${classes.container}`}
        data-mode={mode}
        data-expired={saleTime === ""}
      >
        {saleTime === "" && (
          <p className="text-default lneutral-xdark">Promoção expirada</p>
        )}
        {saleTime !== "" && (
          <div className={`bg-secondary ${classes.saleInfo}`}>
            <p>
              <span className="text-large-m">{sale.discont}%</span> OFF
            </p>
            <p className="text-default">{saleTime}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      className={classes.container}
      data-mode={mode}
      data-expired={saleTime === ""}
      to={`/catalog?sale=${sale.id}&saleName=${encodeURIComponent(sale.name)}`}
    >
      <h2 className="text-display secondary bg-dneutral">{sale.name}</h2>
      {saleTime === "" && (
        <p className="text-default lneutral-xdark">Promoção expirada</p>
      )}
      {saleTime !== "" && (
        <div
          className={`text-default secondary-xdark bg-secondary ${classes.saleInfo}`}
        >
          <p>
            <span className="text-large-m">{sale.discont}%</span> OFF
          </p>
          <p className="text-default">{saleTime}</p>
        </div>
      )}
    </Link>
  );
};

export default ProductSaleStrip;
