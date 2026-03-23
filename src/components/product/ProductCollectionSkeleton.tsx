import SkeletonLoading from "@components/SkeletonLoading";
import ProductCardSkeleton from "./ProductCardSkeleton";

import classes from "./ProductCollectionSkeleton.module.css";

const NUMBER_OF_CARDS = 12;

const ProductCollectionSkeleton = () => {
  return (
    <article className={`defaultContainer ${classes.container}`}>
      <SkeletonLoading className={classes.title} />
      <ul className={classes.list}>
        {Array.from({ length: NUMBER_OF_CARDS }, (_, i) => (
          <li key={i}>
            <ProductCardSkeleton mode="default" />
          </li>
        ))}
      </ul>
    </article>
  );
};

export default ProductCollectionSkeleton;

