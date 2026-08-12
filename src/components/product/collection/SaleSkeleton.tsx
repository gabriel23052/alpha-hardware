import Skeleton from "../card/Skeleton";
import SkeletonLoading from "@components/ui/SkeletonLoading";

import classes from "./SaleSkeleton.module.css";

const NUMBER_OF_CARDS = 12;

const SaleSkeleton = () => {
  return (
    <article className={`defaultContainer ${classes.container}`}>
      <SkeletonLoading className={classes.title} />
      <ul className={classes.list}>
        {Array.from({ length: NUMBER_OF_CARDS }, (_, i) => (
          <li key={i}>
            <Skeleton mode="sale" />
          </li>
        ))}
      </ul>
    </article>
  );
};

export default SaleSkeleton;
