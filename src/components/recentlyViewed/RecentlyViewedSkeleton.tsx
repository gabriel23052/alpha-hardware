import ProductCardSkeleton from "@components/product/card/ProductCardSkeleton";

import classes from "./RecentlyViewedSkeleton.module.css";

const NUMBER_OF_CARDS = 4;

const RecentlyViewedSkeleton = () => {
  return (
    <ul className={classes.container}>
      {Array.from({ length: NUMBER_OF_CARDS }, (_, i) => (
        <li key={i}>
          <ProductCardSkeleton mode="default" />
        </li>
      ))}
    </ul>
  );
};

export default RecentlyViewedSkeleton;

