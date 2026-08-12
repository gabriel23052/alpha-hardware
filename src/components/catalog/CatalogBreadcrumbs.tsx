import { useSearchParams } from "react-router";

import CatalogBreadcrumb from "./CatalogBreadcrumb";

import { CATEGORIES } from "../../config";

import classes from "./CatalogBreadcrumbs.module.css";

const CATEGORIES_NAMES = CATEGORIES.map((c) => c.name);

const CatalogBreadcrumbs = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const remove = (id: string) => {
    setSearchParams((prev) => {
      prev.delete(id);
      return prev;
    });
  };

  const saleId = searchParams.get("sale");
  const search = searchParams.get("search");
  const category = searchParams.get("category");

  return (
    <div className={classes.container}>
      {saleId && (
        <CatalogBreadcrumb
          close={() => {
            remove("sale");
            remove("saleName");
          }}
        >
          {searchParams.get("saleName") || `Promoção ${saleId}`}
        </CatalogBreadcrumb>
      )}
      {search && (
        <CatalogBreadcrumb close={() => remove("search")}>
          {`Busca por: "${search}"`}
        </CatalogBreadcrumb>
      )}
      {CATEGORIES_NAMES.includes(category || "") && (
        <CatalogBreadcrumb close={() => remove("category")}>
          {CATEGORIES.find((cat) => cat.name === category)?.label}
        </CatalogBreadcrumb>
      )}
    </div>
  );
};

export default CatalogBreadcrumbs;
