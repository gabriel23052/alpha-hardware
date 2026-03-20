import { useEffect, useState } from "react";

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

  return (
    <div
      className={`text-default secondary-xdark bg-secondary ${classes.sale}`}
      data-mode={mode}
      data-expired={saleTime === ""}
    >
      {saleTime === "" && (
        <p className="text-default lneutral-xdark">Promoção expirada</p>
      )}
      {saleTime !== "" && (
        <>
          <p>
            <span className="text-large-m">{sale.discont}%</span> OFF
          </p>
          <p className="text-default">{saleTime}</p>
        </>
      )}
    </div>
  );
};

export default ProductSaleStrip;
