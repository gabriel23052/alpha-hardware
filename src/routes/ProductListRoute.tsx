import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router";

import ProductFilter from "@components/product/ProductFilter";
import ProductList from "@components/product/ProductList";

import useJafh from "@hooks/useJafh";
import useFakeAPI from "@hooks/useFakeAPI";
import useDebounce from "@hooks/useDebounce";

import classes from "./ProductListRoute.module.css";
import ProductFilterBreadcrumb from "@components/product/ProductFilterBreadcrumb";

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
  const [showSaleBreadcrumb, setShowSaleBreadcrumb] = useState(true);

  const [params] = useSearchParams();

  const location = useLocation();

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
      return;
    }
    updateFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterForm.fields]);

  useEffect(() => {
    verifyQueryParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const removeSaleFilter = () => {
    setShowSaleBreadcrumb(false);
    filterForm.updateField("sale", null);
  };

  const removeNameFilter = () => {
    filterForm.updateField("name", null);
  };

  const verifyQueryParams = () => {
    const category = params.get("category");
    const sale = params.get("sale");
    const name = params.get("name");
    if (category) filterForm.updateField("category", category);
    if (sale) filterForm.updateField("sale", sale);
    if (name) filterForm.updateField("name", name);
  };

  return (
    <main className={`defaultContainer ${classes.productListRoute}`}>
      <div className={`${classes.topMenu}`}>
        <div className={`${classes.filtersBreadcrumb}`}>
          {api.data && showSaleBreadcrumb && api.data.meta?.saleName && (
            <ProductFilterBreadcrumb closeBlickHandler={removeSaleFilter}>
              {api.data.meta.saleName}
            </ProductFilterBreadcrumb>
          )}
          {filterForm.fields.name.value && (
            <ProductFilterBreadcrumb closeBlickHandler={removeNameFilter}>
              {`Busca por: "${filterForm.fields.name.value}"`}
            </ProductFilterBreadcrumb>
          )}
        </div>
      </div>
      <ProductFilter filterForm={filterForm} />
      {api.loading ? (
        <h1>Carregando</h1>
      ) : api.error ? (
        <h1>Erro: {api.error}</h1>
      ) : (
        api.data?.products && (
          <ProductList
            className={classes.productList}
            products={api.data?.products}
            hideSale={!api.data.meta?.saleName}
          />
        )
      )}
    </main>
  );
};

export default ProductListRoute;
