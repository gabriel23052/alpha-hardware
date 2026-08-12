import ErrorMessage from "@components/ui/ErrorMessage";
import Grid from "./Grid";
import CollectionSkeleton from "./CollectionSkeleton";

import classes from "./Collection.module.css";

type Props = {
  data: IProductCollection | undefined;
  loading: boolean;
  error: IFakeApiError | null;
};

const Collection = ({ data, loading, error }: Props) => {
  if (loading) return <CollectionSkeleton />;

  return (
    <article className={`defaultContainer ${classes.productSelection}`}>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      {data && (
        <>
          <div className={classes.titleWithLine}>
            <h2 className={`text-verylarge-m dneutral-dark ${classes.title}`}>
              {data.name}
            </h2>
          </div>
          <Grid
            className={classes.products}
            products={data.products}
            mode="default"
          />
        </>
      )}
    </article>
  );
};

export default Collection;
