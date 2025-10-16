import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import ProductFilter from "@components/product/ProductFilter";
import ProductList from "@components/product/ProductList";

import useFakeAPI from "@hooks/useFakeAPI";

import SVGClose from "@svg/close.svg?react";

import classes from "./ProductListRoute.module.css";

const ProductListRoute = () => {
  const [params] = useSearchParams();
  const [filter, setFilter] = useState<IFakeApiProductFilter>(() => {
    const sale = params.get("sale");
    if (sale && sale.length === 6) return { sale };
    return {};
  });
  const {
    data: productGroup,
    loading,
    error,
    request,
  } = useFakeAPI<IProductGroup>("GET /api/products");

  const products = productGroup?.products;
  const meta = productGroup?.meta;

  useEffect(() => {
    request(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const removeSaleFilter = () => {
    setFilter((prev) => {
      const newFilter = { ...prev };
      delete newFilter.sale;
      return newFilter;
    });
  };

  return (
    <main className={`defaultContainer ${classes.productListRoute}`}>
      <ProductFilter setFilter={setFilter} />
      {loading ? (
        <h1>Carregando</h1>
      ) : error ? (
        <h1>Erro: {error}</h1>
      ) : (
        products && (
          <>
            {meta?.saleName && (
              <span
                className={`bg-secondary-light secondary-xdark text-default ${classes.saleName}`}
              >
                {meta?.saleName}{" "}
                <button onClick={removeSaleFilter}>
                  <SVGClose />
                </button>
              </span>
            )}
            <ProductList
              className={classes.productList}
              products={products}
              hideSale={!meta?.saleName}
            />
          </>
        )
      )}
    </main>
  );
};

export default ProductListRoute;
