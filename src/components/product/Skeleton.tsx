import RelatedSkeleton from "./collection/RelatedSkeleton";
import InfoSkeleton from "./InfoSkeleton";
import SkeletonLoading from "@components/ui/SkeletonLoading";

import classes from "./Skeleton.module.css";

const Skeleton = () => {
  return (
    <div className={`defaultContainer ${classes.container}`} aria-hidden="true">
      <SkeletonLoading className={classes.title} />
      <div className={classes.main}>
        <SkeletonLoading className={classes.gallery} />
        <SkeletonLoading className={classes.actions} />
      </div>
      <RelatedSkeleton />
      <InfoSkeleton />
    </div>
  );
};

export default Skeleton;
