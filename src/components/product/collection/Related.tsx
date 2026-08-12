import type { TProduct } from "../../../app.types";

import type { ResponseError } from "@hooks/useFakeAPI";

import Grid from "./Grid";
import RelatedSkeleton from "./RelatedSkeleton";
import UnderlinedTitle from "@components/ui/UnderlinedTitle";
import ErrorMessage from "@components/ui/ErrorMessage";

import classes from "./Related.module.css";

type Props = {
  data: TProduct["card"][] | null;
  loading: boolean;
  error: ResponseError | null;
};

const Related = ({ data, loading, error }: Props) => {
  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  if (loading) return <RelatedSkeleton />;

  return (
    <div className={classes.container}>
      <UnderlinedTitle className={classes.title} align="left">
        Produtos relacionados
      </UnderlinedTitle>
      {data && (
        <Grid className={classes.list} products={data} mode="hideActions" />
      )}
    </div>
  );
};

export default Related;
