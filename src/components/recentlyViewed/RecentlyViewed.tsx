import Grid from "@components/product/collection/Grid";

import SVGRecently from "@svg/recently.svg?react";

import { useRecentlyViewedStore } from "@stores/useRecentlyViewedStore";

import classes from "./RecentlyViewed.module.css";

const RecentlyViewed = () => {
  const recentlyViewedProducts = useRecentlyViewedStore(
    (state) => state.products,
  );

  if (!recentlyViewedProducts || recentlyViewedProducts.length === 0) {
    return null;
  }

  return (
    <section className={`bg-lneutral-xlight ${classes.container}`}>
      <div className={`defaultContainer ${classes.wrapper}`}>
        <div className={classes.title}>
          <SVGRecently width={32} height={34} />
          <h2 className="text-verylarge-m dneutral">
            Produtos que você viu recentemente
          </h2>
        </div>
        <Grid
          className={classes.products}
          products={recentlyViewedProducts}
          mode="default"
        />
      </div>
    </section>
  );
};

export default RecentlyViewed;
