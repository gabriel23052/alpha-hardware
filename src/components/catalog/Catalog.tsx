import { useEffect, useId, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router";

import ErrorMessage from "@components/ui/ErrorMessage";
import CatalogFilter from "@components/catalog/filter/CatalogFilter";
import ProductList from "@components/product/ProductList";
import CatalogTopMenu from "./CatalogTopMenu";
import CatalogSkeleton from "./CatalogSkeleton";

import useJafh from "@hooks/useJafh";
import useFakeAPI from "@hooks/useFakeAPI";
import useDebounce from "@hooks/useDebounce";

import FieldValidations from "@utils/FieldValidations";

import classes from "./Catalog.module.css";
import usePageTitle from "@hooks/usePageTitle";

export type FilterFormFields = {
  name: string;
  saleId: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  tags: [string, string][];
  sort: "" | "increasingPrice" | "decreasingPrice" | "alphabetical";
};

const FILTER_UPDATE_DELAY = 1000;

const Catalog = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [emptyFilter, setEmptyFilter] = useState(true);
  const firstRender = useRef(true);
  const bypassDebouncedUpdate = useRef(true);
  const filterContainerID = useId();

  const [params] = useSearchParams();
  const location = useLocation();

  usePageTitle("Alpha Hardware | Catálogo");

  const api = useFakeAPI<IProduct_Card[]>("GET api/products/query");

  const filterForm = useJafh<FilterFormFields>(
    {
      name: { value: "", validation: null },
      saleId: { value: "", validation: null },
      category: { value: "", validation: null },
      minPrice: { value: "", validation: FieldValidations.priceFilter },
      maxPrice: { value: "", validation: FieldValidations.priceFilter },
      tags: { value: [], validation: null },
      sort: { value: "", validation: null },
    },
    "Erro na validação, tente novamente",
  );

  const updateFilter = () => {
    if (!filterForm.isValid) return;
    const formData = filterForm.getData();
    const filter: IProductFilter = {};
    if (formData.name !== "") filter.name = formData.name;
    if (formData.saleId !== "") filter.saleId = formData.saleId;
    if (formData.category !== "") filter.category = formData.category;
    if (formData.minPrice !== "")
      filter.minPrice = Math.floor(
        Number(formData.minPrice.replace(",", ".")) * 100,
      );
    if (formData.maxPrice !== "")
      filter.maxPrice = Math.floor(
        Number(formData.maxPrice.replace(",", ".")) * 100,
      );
    if (formData.tags.length !== 0)
      filter.tags = formData.tags.map((tag) => tag[1]);
    if (Object.keys(filter).length === 0) {
      setEmptyFilter(true);
      return;
    }
    setEmptyFilter(false);
    const sort = filterForm.fields.sort.value;
    const query: IProductQuery = {
      format: "card",
      filter,
    };
    if (sort !== "") query.sort = sort;
    api.fetch(query);
  };

  const debouncedUpdateFilter = useDebounce(updateFilter, FILTER_UPDATE_DELAY);

  const updateCategory = (newCategory: string) => {
    filterForm.updateField<string>("category", newCategory);
    filterForm.updateField<string[]>("tags", []);
    filterForm.updateField<string>("minPrice", "");
    filterForm.updateField<string>("maxPrice", "");
    filterForm.updateField<string>("saleId", "");
  };

  useEffect(() => {
    bypassDebouncedUpdate.current = true;
    updateFieldsFromQueryParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (bypassDebouncedUpdate.current) {
      bypassDebouncedUpdate.current = false;
      updateFilter();
      return;
    }
    debouncedUpdateFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterForm.fields]);

  const updateFieldsFromQueryParams = () => {
    if (params.get("category")) {
      updateCategory(params.get("category") || "");
    }
    if (params.get("sale")) {
      filterForm.updateField("saleId", params.get("sale"));
    }
    if (params.get("name")) {
      filterForm.updateField("name", params.get("name"));
    }
  };

  const openMobileFilter = () => {
    setShowFilter(true);
  };

  return (
    <main className={`defaultContainer ${classes.catalogRoute}`}>
      <CatalogTopMenu
        filterForm={filterForm}
        openMobileFilter={openMobileFilter}
        productsAmount={api.data ? (emptyFilter ? 0 : api.data.length) : 0}
        filterContainerId={filterContainerID}
        updateCategory={updateCategory}
      />
      <CatalogFilter
        filterForm={filterForm}
        filterContainerID={filterContainerID}
        updateCategory={updateCategory}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />

      {api.loading && <CatalogSkeleton />}
      {api.error && <ErrorMessage>{api.error.message}</ErrorMessage>}
      {!api.loading &&
        api.data &&
        (emptyFilter || api.data.length === 0 ? (
          <p className={`text-default dneutral-dark ${classes.badFilter}`}>
            Ops! Nenhum produto encontrado, verifique os filtros
          </p>
        ) : (
          <ProductList
            className={classes.products}
            products={api.data}
            mode="default"
          />
        ))}
    </main>
  );
};

export default Catalog;
