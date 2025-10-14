import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router";

import ProductFilter from "@components/product/ProductFilter";
import ProductList from "@components/product/ProductList";

import useFakeAPI from "@hooks/useFakeAPI";

import classes from "./ProductListRoute.module.css";

const ProductListRoute = () => {
  const [filter, setFilter] = useState<IFakeApiProductFilter>({});
  const [params] = useSearchParams();
  const location = useLocation();

  const {
    data: products,
    loading,
    error,
    request,
  } = useFakeAPI<IProduct[]>("GET /api/products");

  useEffect(() => {
    const sale = params.get("sale");
    if (sale && sale.length === 6) setFilter((prev) => ({ ...prev, sale }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (Object.keys(filter).length === 0) return;
    request(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <main className={`defaultContainer ${classes.productListRoute}`}>
      <div className={`bg-dneutral ${classes.decoration}`}></div>
      <ProductFilter setFilter={setFilter} />
      {loading ? (
        <h1>Carregando</h1>
      ) : error ? (
        <h1>Erro: {error}</h1>
      ) : (
        products && (
          <ProductList
            className={classes.productList}
            products={products}
            hideSale={true}
          />
        )
      )}
    </main>
  );
};

export default ProductListRoute;
