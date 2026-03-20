import SkeletonLoading from "@components/SkeletonLoading";

import classes from "./ProductSaleSkeleton.module.css";

const NUMBER_OF_CARDS = 12;

const ProductSaleSkeleton = () => {
  return (
    <article className={`defaultContainer ${classes.container}`}>
      <SkeletonLoading className={classes.title} />
      <ul className={classes.list}>
        {Array.from({ length: NUMBER_OF_CARDS }, (_, i) => (
          <li key={i}>
            <SkeletonLoading className={classes.card} />
          </li>
        ))}
      </ul>
    </article>
  );
};

export default ProductSaleSkeleton;

