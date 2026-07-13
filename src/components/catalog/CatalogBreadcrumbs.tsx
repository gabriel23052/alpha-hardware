import { useSearchParams } from "react-router";

import CatalogBreadcrumb from "./CatalogBreadcrumb";

import type { JafhUpdateField } from "@hooks/useJafh";

import { CATEGORIES } from "../../config";

import classes from "./CatalogBreadcrumbs.module.css";

type Props = {
  name: string;
  category: string;
  saleId: string;
  updateFormField: JafhUpdateField<string>;
  updateCategory: (newCategory: string) => void;
};

const CatalogBreadcrumbs = ({
  name,
  category,
  saleId,
  updateFormField,
  updateCategory,
}: Props) => {
  const [params] = useSearchParams();

  const removeFilter = (formId: "saleId" | "name" | "category") => {
    if (formId === "category") {
      updateCategory("");
      return;
    }
    updateFormField(formId, "");
  };

  return (
    <div className={classes.container}>
      {saleId !== "" && (
        <CatalogBreadcrumb close={() => removeFilter("saleId")}>
          {params.get("saleName") || `Promoção ${saleId}`}
        </CatalogBreadcrumb>
      )}
      {name !== "" && (
        <CatalogBreadcrumb close={() => removeFilter("name")}>
          {`Busca por: "${name}"`}
        </CatalogBreadcrumb>
      )}
      {CATEGORIES.map(c => c.name).includes(category) && (
        <CatalogBreadcrumb close={() => removeFilter("category")}>
          {CATEGORIES.find((cat) => cat.name === category)?.label}
        </CatalogBreadcrumb>
      )}
    </div>
  );
};

export default CatalogBreadcrumbs;

