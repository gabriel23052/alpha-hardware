import ProductCardSkeleton from "@components/product/card/Skeleton";

import classes from "./Skeleton.module.css";

const NUMBER_OF_CARDS = 4;

const Skeleton = () => {
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

export default Skeleton;
