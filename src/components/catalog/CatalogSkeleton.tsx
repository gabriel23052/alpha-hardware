import ProductCardSkeleton from "@components/product/ProductCardSkeleton";

import classes from "./CatalogSkeleton.module.css";

const NUMBER_OF_CARDS = 12;

const CatalogSkeleton = () => {
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

export default CatalogSkeleton;

