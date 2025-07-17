import ProductCard from "./product/ProductCard";

import SVGRecently from "@svg/recently.svg?react";

import classes from "./RecentlyViewed.module.css";

const RecentlyViewed = ({ products }: { products: IProduct[] }) => {
  return (
    <section className={`bg-lneutral-xlight ${classes.recentlyViewed}`}>
      <div className={`defaultContainer ${classes.wrapper}`}>
        <div className={`${classes.title}`}>
          <SVGRecently />
          <h2 className="dneutral text-verylarge-m">
            Produtos que você viu recentemente
          </h2>
        </div>
        <div className={`${classes.products}`}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showSale={false}
              buttons={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
