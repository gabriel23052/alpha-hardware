import { useEffect, useId, useRef, useState } from "react";
import { useSearchParams } from "react-router";

import ErrorMessage from "@components/ui/ErrorMessage";
import FilterForm from "@components/catalog/FilterForm";
import Grid from "@components/product/collection/Grid";
import Header from "./Header";
import Skeleton from "./Skeleton";

import useFakeAPI from "@hooks/useFakeAPI";
import usePageTitle from "@hooks/usePageTitle";
import useDebounce from "@hooks/useDebounce";

import classes from "./Catalog.module.css";

export type FilterFormFields = Omit<IProductFilter, "saleId" | "search ">;

const FILTER_UPDATE_DELAY = 1500;

const Catalog = () => {
  usePageTitle("Alpha Hardware | Catálogo");
  const [showFilter, setShowFilter] = useState(false);
  const [searchParams] = useSearchParams();
  const firstRenderRef = useRef([true, true]);
  const filterContainerID = useId();

  const api = useFakeAPI<IProduct_Card[]>("GET api/products/query");

  const debouncedFetchFilter = useDebounce(() => {
    api.fetch(query);
  }, FILTER_UPDATE_DELAY);

  const [query, setQuery] = useState<IProductQuery>(() => {
    const category = searchParams.get("category");
    const saleId = searchParams.get("sale");
    const search = searchParams.get("search");
    const filter: IProductFilter = {};
    if (saleId) filter.saleId = saleId.trim();
    if (search) filter.search = search.trim();
    if (category) filter.category = category.trim();
    return { filter, pattern: "card" };
  });

  const isFilterEmpty = Object.keys(query.filter).length === 0;

  useEffect(() => {
    if (firstRenderRef.current[0]) {
      firstRenderRef.current[0] = false;
      if (!isFilterEmpty) api.fetch(query);
      return;
    }
    if (isFilterEmpty) return;
    debouncedFetchFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (firstRenderRef.current[1]) {
      firstRenderRef.current[1] = false;
      return;
    }

    const saleId = searchParams.get("sale") || undefined;
    const search = searchParams.get("search") || undefined;

    if (query.filter.saleId !== saleId) {
      if (saleId === undefined) {
        const newFilter = { ...query.filter };
        delete newFilter.saleId;
        setFilter(newFilter);
      } else {
        setFilter({ ...query.filter, saleId });
      }
    }
    if (query.filter.search !== search) {
      if (search === undefined) {
        const newFilter = { ...query.filter };
        delete newFilter.search;
        setFilter(newFilter);
      } else {
        setFilter({ ...query.filter, search });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const setFilter = (filter: IProductFilter) => {
    setQuery((prev) => {
      if (prev.sort) {
        return {
          filter,
          pattern: "card",
          sort: prev.sort,
        };
      }
      return {
        filter,
        pattern: "card",
      };
    });
  };

  const setFilterFormFields = (filterFormFields: FilterFormFields) => {
    const newFilter: IProductFilter = { ...filterFormFields };
    if (query.filter.saleId) newFilter.saleId = query.filter.saleId;
    if (query.filter.search) newFilter.search = query.filter.search;
    setFilter(newFilter);
  };

  const setSort = (sort: IProductSort | "") => {
    setQuery((prev) => {
      if (sort === "") {
        return { filter: prev.filter, pattern: "card" };
      }
      return { filter: prev.filter, sort, pattern: "card" };
    });
  };

  const openMobileFilter = () => {
    setShowFilter(true);
  };

  return (
    <main className={`defaultContainer ${classes.catalogRoute}`}>
      <Header
        sort={query.sort}
        setSort={setSort}
        openMobileFilter={openMobileFilter}
        productsAmount={api.data ? (isFilterEmpty ? 0 : api.data.length) : 0}
        filterContainerId={filterContainerID}
      />
      <FilterForm
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        setFilterForm={setFilterFormFields}
        filterContainerID={filterContainerID}
      />
      {isFilterEmpty ? (
        <p className={`text-default dneutral-dark ${classes.badFilter}`}>
          Selecione um ou mais filtros para procurarmos os produtos
        </p>
      ) : api.loading ? (
        <Skeleton />
      ) : api.error ? (
        <ErrorMessage>{api.error.message}</ErrorMessage>
      ) : api.data && api.data.length > 0 ? (
        <Grid
          className={classes.products}
          products={api.data}
          mode="default"
        />
      ) : (
        <p className={`text-default dneutral-dark ${classes.badFilter}`}>
          Ops! Nenhum produto encontrado, verifique os filtros
        </p>
      )}
    </main>
  );
};

export default Catalog;
