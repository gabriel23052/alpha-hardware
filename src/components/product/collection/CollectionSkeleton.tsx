import SkeletonLoading from "@components/ui/SkeletonLoading";
import Skeleton from "../card/Skeleton";

import classes from "./CollectionSkeleton.module.css";

const NUMBER_OF_CARDS = 12;

const CollectionSkeleton = () => {
  return (
    <article className={`defaultContainer ${classes.container}`}>
      <SkeletonLoading className={classes.title} />
      <ul className={classes.list}>
        {Array.from({ length: NUMBER_OF_CARDS }, (_, i) => (
          <li key={i}>
            <Skeleton mode="default" />
          </li>
        ))}
      </ul>
    </article>
  );
};

export default CollectionSkeleton;
