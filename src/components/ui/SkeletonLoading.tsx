import classes from "./SkeletonLoading.module.css";

type Props = {
  className?: string;
};

const SkeletonLoading = ({ className }: Props) => {
  return (
    <div className={className || ""} aria-hidden="true">
      <div className={classes.animation}></div>
    </div>
  );
};

export default SkeletonLoading;
