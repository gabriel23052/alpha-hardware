import ProductList from "@components/product/ProductList";

import SVGRecently from "@svg/recently.svg?react";

import useFakeAPI from "@hooks/useFakeAPI";

import classes from "./RecentlyViewed.module.css";
import { useEffect } from "react";

const RecentlyViewed = () => {
  const { data, request } = useFakeAPI<IProductSelection>(
    "GET /api/products/recentlyViewed"
  );

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data) {
    return (
      <section className={`bg-lneutral-xlight ${classes.recentlyViewed}`}>
        <div className={`defaultContainer ${classes.wrapper}`}>
          <div className={`${classes.title}`}>
            <SVGRecently />
            <h2 className="dneutral text-verylarge-m">
              Produtos que você viu recentemente
            </h2>
          </div>
          <ProductList
            products={data.products}
            hideSale={true}
            hideButtons={true}
            className={classes.products}
          />
        </div>
      </section>
    );
  }
};

export default RecentlyViewed;
