import ProductCardSkeleton from "@components/product/card/Skeleton";

import classes from "./Skeleton.module.css";

const NUMBER_OF_CARDS = 12;

const Skeleton = () => {
  return (
    <article className={classes.container}>
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

export default Skeleton;
