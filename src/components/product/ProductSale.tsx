import { Link } from "react-router";

import ProductList from "./ProductList";
import ProductSaleSkeleton from "./ProductSaleSkeleton";
import ErrorMessage from "@components/ui/ErrorMessage";

import classes from "./ProductSale.module.css";

type Props = {
  data: ISale | null;
  loading: boolean;
  error: string | null;
};

const ProductSale = ({ data, loading, error }: Props) => {
  if (loading) return <ProductSaleSkeleton />;

  return (
    <article className={`defaultContainer ${classes.container}`}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {data && (
        <>
          <Link
            className={classes.title}
            to={`/catalog?sale=${encodeURIComponent(data.id)}&saleName=${encodeURIComponent(data.name)}`}
          >
            <h2 className={`text-display secondary-light`}>{data.name}</h2>
          </Link>
          <ProductList
            className={classes.productList}
            products={data.products}
            mode="sale"
          />
        </>
      )}
    </article>
  );
};

export default ProductSale;
