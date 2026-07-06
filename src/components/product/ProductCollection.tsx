import ErrorMessage from "@components/ui/ErrorMessage";
import ProductList from "./ProductList";
import ProductCollectionSkeleton from "./ProductCollectionSkeleton";

import classes from "./ProductCollection.module.css";

type Props = {
  data: IProductCollection | undefined;
  loading: boolean;
  error: string | null;
};

const ProductCollection = ({ data, loading, error }: Props) => {
  if (loading) return <ProductCollectionSkeleton />;

  return (
    <article className={`defaultContainer ${classes.productSelection}`}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {data && (
        <>
          <div className={`${classes.titleWithLine}`}>
            <h2 className={`text-verylarge-m dneutral-dark ${classes.title}`}>
              {data.name}
            </h2>
          </div>
          <ProductList
            className={classes.products}
            products={data.products}
            mode="default"
          />
        </>
      )}
    </article>
  );
};

export default ProductCollection;
