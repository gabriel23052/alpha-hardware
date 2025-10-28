import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";

import ProductFilter from "@components/product/ProductFilter";
import ProductList from "@components/product/ProductList";

import useJafh from "@hooks/useJafh";
import useFakeAPI from "@hooks/useFakeAPI";
import useDebounce from "@hooks/useDebounce";

import SVGClose from "@svg/close.svg?react";

import classes from "./ProductListRoute.module.css";

type FilterFormFields = {
  name: null | string;
  sale: null | string;
  category: string;
  minPrice: string;
  maxPrice: string;
  tags: string[];
};

const FILTER_UPDATE_DELAY = 1000;

const ProductListRoute = () => {
  const [params] = useSearchParams();

  const filterForm = useJafh<FilterFormFields>(
    {
      name: { value: null, validation: null },
      sale: { value: null, validation: null },
      category: { value: "", validation: null },
      minPrice: { value: "", validation: null },
      maxPrice: { value: "", validation: null },
      tags: { value: [], validation: null },
    },
    "Erro na validação, tente novamente"
  );

  const api = useFakeAPI<IProductGroup>("GET /api/products");

  const updateFilter = useDebounce(() => {
    if (!filterForm.isValid) return;
    const formData = filterForm.getData();
    const filter: IFakeApiProductFilter = {};
    if (formData.name !== null) filter.name = formData.name;
    if (formData.sale !== null) filter.sale = formData.sale;
    if (formData.category !== "") filter.category = formData.category;
    if (formData.minPrice !== "")
      filter.minPrice = Number(formData.minPrice.replace(",", ".")) * 100;
    if (formData.maxPrice !== "")
      filter.maxPrice = Number(formData.maxPrice.replace(",", ".")) * 100;
    if (formData.tags.length !== 0) filter.tags = formData.tags;
    api.request(filter);
  }, FILTER_UPDATE_DELAY);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      const category = params.get("category");
      const sale = params.get("sale");
      if (category) filterForm.updateField("category", category);
      if (sale) filterForm.updateField("sale", sale);
    }
    updateFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterForm.fields]);

  const removeSaleFilter = () => {
    filterForm.updateField("sale", null);
  };

  return (
    <main className={`defaultContainer ${classes.productListRoute}`}>
      <ProductFilter filterForm={filterForm} />
      {api.loading ? (
        <h1>Carregando</h1>
      ) : api.error ? (
        <h1>Erro: {api.error}</h1>
      ) : (
        api.data?.products && (
          <>
            {api.data.meta?.saleName && (
              <span
                className={`bg-secondary-light secondary-xdark text-default ${classes.saleName}`}
              >
                {api.data.meta?.saleName}{" "}
                <button onClick={removeSaleFilter}>
                  <SVGClose />
                </button>
              </span>
            )}
            <ProductList
              className={classes.productList}
              products={api.data?.products}
              hideSale={!api.data.meta?.saleName}
            />
          </>
        )
      )}
    </main>
  );
};

export default ProductListRoute;
