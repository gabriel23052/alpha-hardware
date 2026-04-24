import UnderlinedTitle from "@components/UnderlinedTitle";
import ProductList from "./ProductList";
import ProductRelatedSkeleton from "./ProductRelatedSkeleton";
import ErrorMessage from "@components/ErrorMessage";

import classes from "./ProductRelated.module.css";

type Props = {
  data: IProduct_Card[] | null;
  loading: boolean;
  error: string | null;
};

const ProductRelated = ({ data, loading, error }: Props) => {
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  if (loading) return <ProductRelatedSkeleton />;

  return (
    <div className={classes.container}>
      <UnderlinedTitle className={classes.title} align="left">
        Produtos relacionados
      </UnderlinedTitle>
      {data && (
        <ProductList
          className={classes.list}
          products={data}
          mode="hideActions"
        />
      )}
    </div>
  );
};

export default ProductRelated;
