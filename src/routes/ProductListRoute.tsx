import { useEffect, useId, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router";

import ProductFilter from "@components/product/ProductFilter";
import ProductList from "@components/product/ProductList";
import ProductFilterBreadcrumb from "@components/product/ProductFilterBreadcrumb";
import ProductSortSelect from "@components/product/ProductSortSelect";

import useJafh from "@hooks/useJafh";
import useFakeAPI from "@hooks/useFakeAPI";
import useDebounce from "@hooks/useDebounce";

import FieldValidations from "@utils/FieldValidations";

import SVGFilter from "@svg/filter.svg?react";

import classes from "./ProductListRoute.module.css";

type FilterFormFields = {
  name: null | string;
  sale: null | string;
  category: string;
  minPrice: string;
  maxPrice: string;
  tags: [string, string][];
  sortBy: "" | "increasingPrice" | "decreasingPrice";
};

const FILTER_UPDATE_DELAY = 1000;

const ProductListRoute = () => {
  const [showSaleBreadcrumb, setShowSaleBreadcrumb] = useState(true);
  const [showFilter, setShowFilter] = useState(window.innerWidth > 900);

  const [params] = useSearchParams();

  const location = useLocation();

  const filterForm = useJafh<FilterFormFields>(
    {
      name: { value: null, validation: null },
      sale: { value: null, validation: null },
      category: { value: "", validation: null },
      minPrice: { value: "", validation: FieldValidations.priceFilter },
      maxPrice: { value: "", validation: FieldValidations.priceFilter },
      tags: { value: [], validation: null },
      sortBy: { value: "", validation: null },
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
    if (formData.tags.length !== 0)
      filter.tags = formData.tags.map((tag) => tag[1]);
    if (formData.sortBy !== "") filter.sortBy = formData.sortBy;
    api.fetch(filter);
  }, FILTER_UPDATE_DELAY);

  const firstRender = useRef(true);
  const previousCategory = useRef("");
  const mediaQuery = useRef(window.matchMedia("(max-width: 900px)"));

  const filterContainerID = useId();

  const toggleMobileFilter = useRef((e: MediaQueryListEvent) => {
    if (e.matches) {
      setShowFilter(false);
      return;
    }
    setShowFilter(true);
  });

  useEffect(() => {
    mediaQuery.current.addEventListener("change", toggleMobileFilter.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mediaQuery.current.removeEventListener(
        "change",
        // eslint-disable-next-line react-hooks/exhaustive-deps
        toggleMobileFilter.current
      );
    };
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (filterForm.fields.category.value !== previousCategory.current) {
      filterForm.updateField<string[]>("tags", []);
      filterForm.updateField<string>("minPrice", "");
      filterForm.updateField<string>("maxPrice", "");
      previousCategory.current = filterForm.fields.category.value;
      return;
    }
    updateFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterForm.fields]);

  useEffect(() => {
    updateFieldsFromQueryParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const removeSaleFilter = () => {
    setShowSaleBreadcrumb(false);
    filterForm.updateField("sale", null);
  };

  const removeNameFilter = () => {
    filterForm.updateField("name", null);
  };

  const updateFieldsFromQueryParams = () => {
    filterForm.updateField("category", "");
    filterForm.updateField("sale", null);
    filterForm.updateField("name", null);
    if (params.get("category")) {
      filterForm.updateField("category", params.get("category"));
      return;
    }
    if (params.get("sale")) {
      filterForm.updateField("sale", params.get("sale"));
      return;
    }
    if (params.get("name")) {
      filterForm.updateField("name", params.get("name"));
      return;
    }
  };

  const openMobileFilter = () => {
    setShowFilter(true);
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
        <span className={`lneutral-xdark text-small`}>
          Exibindo {api.data ? api.data.products.length : 0} produtos
        </span>
        <button
          className={`bg-lneutral-xlight dneutral-light ${classes.filterBtn}`}
          onClick={openMobileFilter}
          aria-label="Abrir os filtros"
          aria-controls={filterContainerID}
        >
          <SVGFilter />
        </button>
        <ProductSortSelect
          field={filterForm.fields.sortBy}
          updateField={filterForm.updateField}
        />
      </div>
      <ProductFilter
        filterForm={filterForm}
        filterContainerID={filterContainerID}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />
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
