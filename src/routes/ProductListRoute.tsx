import { useEffect, useState } from "react";

import ProductFilter from "@components/product/ProductFilter";
import ProductList from "@components/product/ProductList";

import useFakeAPI from "@hooks/useFakeAPI";

import classes from "./ProductListRoute.module.css";

const ProductListRoute = () => {
  const [filter, setFilter] = useState<IFakeApiProductFilter>({});

  const {
    data: products,
    loading,
    error,
    request,
  } = useFakeAPI<IProduct[]>("GET /api/products");

  useEffect(() => {
    if (Object.keys(filter).length === 0) return;
    request(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleClick = () => {
    setFilter({ sale: "2A0F24" });
  };

  return (
    <main className={`defaultContainer ${classes.productListRoute}`}>
      <div className={`bg-dneutral ${classes.decoration}`}>
        <button onClick={handleClick}>TEST</button>
      </div>
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
