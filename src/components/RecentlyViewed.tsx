import ProductList from "@components/product/ProductList";

import SVGRecently from "@svg/recently.svg?react";

import classes from "./RecentlyViewed.module.css";

const RecentlyViewed = ({ products }: { products: IProduct[] }) => {
  return (
    <section className={`bg-lneutral-xlight ${classes.recentlyViewed}`}>
      <div className={`defaultContainer`}>
        <div className={`${classes.title}`}>
          <SVGRecently />
          <h2 className="dneutral text-verylarge-m">
            Produtos que você viu recentemente
          </h2>
        </div>
        <ProductList
          products={products}
          hideSale={true}
          hideButtons={true}
          className={classes.products}
        />
      </div>
    </section>
  );
};

export default RecentlyViewed;
