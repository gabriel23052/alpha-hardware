import { useEffect } from "react";

import LoadingBox from "./LoadingBox";
import ErrorMessage from "./ErrorMessage";
import ProductList from "@components/product/ProductList";

import useFakeAPI from "@hooks/useFakeAPI";

import SVGRecently from "@svg/recently.svg?react";

import classes from "./RecentlyViewed.module.css";

const RecentlyViewed = () => {
  const {
    data: productGroup,
    loading,
    error,
    fetch,
  } = useFakeAPI<IProductGroup>("GET /api/products/recentlyViewed");

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <LoadingBox height="31rem" />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className={`bg-lneutral-xlight ${classes.container}`}>
      <div className={`defaultContainer ${classes.wrapper}`}>
        <div className={`${classes.title}`}>
          <SVGRecently />
          <h2 className="dneutral text-verylarge-m">
            Produtos que você viu recentemente
          </h2>
        </div>
        {productGroup && (
            <ProductList
              className={classes.products}
              products={productGroup.products}
              hideSale={true}
            />
          )
        }
      </div>
    </section>
  );
};

export default RecentlyViewed;
