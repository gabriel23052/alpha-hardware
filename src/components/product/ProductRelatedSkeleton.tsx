import UnderlinedTitle from "@components/UnderlinedTitle";
import ProductCardSkeleton from "./ProductCardSkeleton";

import classes from "./ProductRelatedSkeleton.module.css";

const NUMBER_OF_CARDS = 4;

const ProductRelatedSkeleton = () => {
  return (
    <div className={classes.container} aria-hidden="true">
      <UnderlinedTitle className={classes.title} align="left">
        Produtos relacionados
      </UnderlinedTitle>
      <ul className={classes.list}>
        {Array.from({ length: NUMBER_OF_CARDS }, (_, i) => (
          <li key={i}>
            <ProductCardSkeleton mode="hideActions" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductRelatedSkeleton;

