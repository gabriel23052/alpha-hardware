import SVGRecently from "@svg/recently.svg?react";

import classes from "./RecentlyViewed.module.css";
import ProductList from "./product/ProductList";

const RecentlyViewed = ({
  productSelection,
}: {
  productSelection: IProductSelection;
}) => {
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
          products={productSelection.products}
          showSale={false}
          showButtons={true}
          className={classes.products}
        />
      </div>
    </section>
  );
};

export default RecentlyViewed;
