import SkeletonLoading from "@components/ui/SkeletonLoading";

import classes from "./Skeleton.module.css";

type Props = {
  mode: "default" | "sale" | "hideActions";
};

const Skeleton = ({ mode }: Props) => {
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

export default Skeleton;
