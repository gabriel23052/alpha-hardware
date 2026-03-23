import SkeletonLoading from "@components/SkeletonLoading";

import classes from "./ProductCardSkeleton.module.css";

type Props = {
  mode: "default" | "sale";
};

const ProductCardSkeleton = ({ mode }: Props) => {
  return (
    <SkeletonLoading
      className={mode === "default" ? classes.cardDefault : classes.cardSale}
    />
  );
};

export default ProductCardSkeleton;
