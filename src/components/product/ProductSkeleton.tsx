import ProductRelatedSkeleton from "./ProductRelatedSkeleton";
import ProductInfoSkeleton from "./ProductInfoSkeleton";
import SkeletonLoading from "@components/ui/SkeletonLoading";

import classes from "./ProductSkeleton.module.css";

const ProductSkeleton = () => {
  return (
    <div className={`defaultContainer ${classes.container}`} aria-hidden="true">
      <SkeletonLoading className={classes.title} />
      <div className={classes.main}>
        <SkeletonLoading className={classes.gallery} />
        <SkeletonLoading className={classes.actions} />
      </div>
      <ProductRelatedSkeleton />
      <ProductInfoSkeleton />
    </div>
  );
};

export default ProductSkeleton;

