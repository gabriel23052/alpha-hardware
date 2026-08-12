import { useSearchParams } from "react-router";

import Breadcrumb from "./Breadcrumb";

import { CATEGORIES } from "../../config";

import classes from "./Breadcrumbs.module.css";

const CATEGORIES_NAMES = CATEGORIES.map((c) => c.name);

const Breadcrumbs = () => {
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
        <Breadcrumb
          close={() => {
            remove("sale");
            remove("saleName");
          }}
        >
          {searchParams.get("saleName") || `Promoção ${saleId}`}
        </Breadcrumb>
      )}
      {search && (
        <Breadcrumb close={() => remove("search")}>
          {`Busca por: "${search}"`}
        </Breadcrumb>
      )}
      {CATEGORIES_NAMES.includes(category || "") && (
        <Breadcrumb close={() => remove("category")}>
          {CATEGORIES.find((cat) => cat.name === category)?.label}
        </Breadcrumb>
      )}
    </div>
  );
};

export default Breadcrumbs;
