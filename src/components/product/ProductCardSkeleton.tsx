import SkeletonLoading from "@components/SkeletonLoading";

import classes from "./ProductCardSkeleton.module.css";

type Props = {
  mode: "default" | "sale" | "hideActions";
};

const ProductCardSkeleton = ({ mode }: Props) => {
  return (
    <SkeletonLoading
      className={
        mode === "default"
          ? classes.cardDefault
          : mode === "sale"
            ? classes.cardSale
            : classes.cardHideActions
      }
    />
  );
};

export default ProductCardSkeleton;
