import type { JafhForm } from "@hooks/useJafh";

import type { FilterFormFields } from "./Catalog";
import CatalogBreadcrumbs from "./CatalogBreadcrumbs";
import CatalogSortSelect from "./CatalogSortSelect";

import SVGFilter from "@svg/filter.svg?react";

import classes from "./CatalogTopMenu.module.css";

type Props = {
  filterForm: JafhForm<FilterFormFields>;
  openMobileFilter: () => void;
  filterContainerId: string;
  productsAmount: number;
  updateCategory: (newCategory: string) => void;
};

const CatalogTopMenu = ({
  filterForm,
  openMobileFilter,
  filterContainerId,
  productsAmount,
  updateCategory
}: Props) => {
  return (
    <div className={classes.container}>
      <CatalogBreadcrumbs
        category={filterForm.fields.category.value}
        name={filterForm.fields.name.value}
        saleId={filterForm.fields.saleId.value}
        updateFormField={filterForm.updateField}
        updateCategory={updateCategory}
      />
      <p className={`text-small lneutral-xdark ${classes.itemsDisplayed}`}>
        Exibindo {productsAmount} produtos
      </p>
      <button
        className={`bg-lneutral-xlight dneutral-light ${classes.filterBtn}`}
        onClick={openMobileFilter}
        aria-label="Abrir os filtros"
        aria-controls={filterContainerId}
      >
        <SVGFilter />
      </button>
      <CatalogSortSelect
        field={filterForm.fields.sort}
        updateField={filterForm.updateField}
      />
    </div>
  );
};

export default CatalogTopMenu;

