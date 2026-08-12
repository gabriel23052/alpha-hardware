import { Link } from "react-router";

import type { TSale } from "../../../app.types";

import type { ResponseError } from "@hooks/useFakeAPI";

import Grid from "./Grid";
import SaleSkeleton from "./SaleSkeleton";
import ErrorMessage from "@components/ui/ErrorMessage";

import classes from "./Sale.module.css";

type Props = {
  data: TSale | null;
  loading: boolean;
  error: ResponseError | null;
};

const Sale = ({ data, loading, error }: Props) => {
  if (loading) return <SaleSkeleton />;

  return (
    <article className={`defaultContainer ${classes.container}`}>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      {data && (
        <>
          <Link
            className={classes.title}
            to={`/catalog?sale=${encodeURIComponent(data.id)}&saleName=${encodeURIComponent(data.name)}`}
          >
            <h2 className={`text-display secondary-light`}>{data.name}</h2>
          </Link>
          <Grid
            className={classes.productList}
            products={data.products}
            mode="sale"
          />
        </>
      )}
    </article>
  );
};

export default Sale;
