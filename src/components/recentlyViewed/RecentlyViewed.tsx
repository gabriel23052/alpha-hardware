import { useEffect } from "react";

import ErrorMessage from "@components/ui/ErrorMessage";
import ProductList from "@components/product/ProductList";
import RecentlyViewedSkeleton from "./RecentlyViewedSkeleton";

import useFakeAPI from "@hooks/useFakeAPI";

import SVGRecently from "@svg/recently.svg?react";

import classes from "./RecentlyViewed.module.css";

const RecentlyViewed = () => {
  const request = useFakeAPI<IProduct_Card[]>(
    "GET api/products/recentlyViewed",
  );

  useEffect(() => {
    request.fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={`bg-lneutral-xlight ${classes.container}`}>
      <div className={`defaultContainer ${classes.wrapper}`}>
        <div className={`${classes.title}`}>
          <SVGRecently />
          <h2 className="text-verylarge-m dneutral">
            Produtos que você viu recentemente
          </h2>
        </div>
        {request.loading && <RecentlyViewedSkeleton />}
        {request.error && <ErrorMessage>{request.error}</ErrorMessage>}
        {request.data && (
          <ProductList
            className={classes.products}
            products={request.data}
            mode="default"
          />
        )}
      </div>
    </section>
  );
};

export default RecentlyViewed;
