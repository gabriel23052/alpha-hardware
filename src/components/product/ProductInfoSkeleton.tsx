import UnderlinedTitle from "@components/ui/UnderlinedTitle";
import SkeletonLoading from "@components/ui/SkeletonLoading";

import classes from "./ProductInfoSkeleton.module.css";

const ProductInfoSkeleton = () => {
  return (
    <div className={classes.container} aria-hidden="true">
      <div className={classes.description}>
        <UnderlinedTitle className={classes.descTitle} align="left">
          Descrição
        </UnderlinedTitle>
        <SkeletonLoading className={classes.descriptionSkeleton} />
      </div>
      <div className={classes.specSheet}>
        <UnderlinedTitle className={classes.specTitle} align="left">
          Ficha técnica
        </UnderlinedTitle>
        <SkeletonLoading className={classes.specSkeleton} />
      </div>
    </div>
  );
};

export default ProductInfoSkeleton;

