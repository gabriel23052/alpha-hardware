import { useEffect, useId, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router";

import LoadingBox from "@components/LoadingBox";
import ErrorMessage from "@components/ErrorMessage";
import CatalogFilter from "@components/catalog/CatalogFilter";
import ProductList from "@components/product/ProductList";
import CatalogFilterBreadcrumb from "@components/catalog/CatalogFilterBreadcrumb";
import CatalogSortSelect from "@components/catalog/CatalogSortSelect";

import useJafh from "@hooks/useJafh";
import useFakeAPI from "@hooks/useFakeAPI";
import useDebounce from "@hooks/useDebounce";

import FieldValidations from "@utils/FieldValidations";

import { CATEGORIES } from "../../data";

import SVGFilter from "@svg/filter.svg?react";

import classes from "./Catalog.module.css";

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
const MOBILE_MAX_WIDTH = 900;

const Catalog = () => {
  const [showSaleBreadcrumb, setShowSaleBreadcrumb] = useState(true);
  const [showFilter, setShowFilter] = useState(
    window.innerWidth > MOBILE_MAX_WIDTH
  );

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
  const mediaQuery = useRef(
    window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`)
  );

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

  const removeCategoryFilter = () => {
    filterForm.updateField("category", "");
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
            <CatalogFilterBreadcrumb closeClickHandler={removeSaleFilter}>
              {api.data.meta.saleName}
            </CatalogFilterBreadcrumb>
          )}
          {filterForm.fields.name.value && (
            <CatalogFilterBreadcrumb closeClickHandler={removeNameFilter}>
              {`Busca por: "${filterForm.fields.name.value}"`}
            </CatalogFilterBreadcrumb>
          )}
          {filterForm.fields.category.value !== "" && (
            <CatalogFilterBreadcrumb closeClickHandler={removeCategoryFilter}>
              {
                CATEGORIES.find(
                  (cat) => cat.name === filterForm.fields.category.value
                )?.label
              }
            </CatalogFilterBreadcrumb>
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
        <CatalogSortSelect
          field={filterForm.fields.sortBy}
          updateField={filterForm.updateField}
        />
      </div>
      <CatalogFilter
        filterForm={filterForm}
        filterContainerID={filterContainerID}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />
      {api.loading ? (
        <LoadingBox height="20rem" />
      ) : api.error ? (
        <ErrorMessage message={api.error} />
      ) : api.data?.products ? (
        api.data.products.length === 0 ? (
          <span className={`text-default dneutral-dark ${classes.badFilter}`}>
            Nenhum produto encontrado, verifique os filtros
          </span>
        ) : (
          <ProductList
            className={classes.productList}
            products={api.data.products}
            hideSale={!api.data.meta?.saleName}
          />
        )
      ) : null}
    </main>
  );
};

export default Catalog;
