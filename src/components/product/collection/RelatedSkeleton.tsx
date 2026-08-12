import Skeleton from "../card/Skeleton";
import UnderlinedTitle from "@components/ui/UnderlinedTitle";

import classes from "./RelatedSkeleton.module.css";

const NUMBER_OF_CARDS = 4;

const RelatedSkeleton = () => {
  return (
    <div className={classes.container} aria-hidden="true">
      <UnderlinedTitle className={classes.title} align="left">
        Produtos relacionados
      </UnderlinedTitle>
      <ul className={classes.list}>
        {Array.from({ length: NUMBER_OF_CARDS }, (_, i) => (
          <li key={i}>
            <Skeleton mode="hideActions" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedSkeleton;
