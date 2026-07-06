import type { MouseEventHandler } from "react";

import CatalogFilterTags from "./CatalogFilterTags";
import CatalogFilterPrices from "./CatalogFilterPrices";

import type { JafhForm } from "@hooks/useJafh";

import SVGChevronLeft from "@svg/chevronLeft.svg?react";

import { TAGS } from "../../../config";

import classes from "./CatalogFilter.module.css";
import CatalogFilterCategories from "./CatalogFilterCategories";

type Props = {
  filterForm: JafhForm<{
    category: string;
    minPrice: string;
    maxPrice: string;
    tags: [string, string][];
  }>;
  updateCategory: (newCategory: string) => void;
  filterContainerID: string;
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

const CatalogFilter = ({
  filterForm,
  filterContainerID,
  updateCategory,
  showFilter,
  setShowFilter,
}: Props) => {
  const resetPriceAndTags = () => {
    filterForm.updateField("minPrice", "");
    filterForm.updateField("maxPrice", "");
    filterForm.updateField("tags", []);
  };

  const closeMobileFilter: MouseEventHandler<HTMLFormElement> = (e) => {
    if (e.target instanceof HTMLFormElement) setShowFilter(false);
  };

  return (
    <form
      className={classes.container}
      data-expanded={showFilter}
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
      }}
      onClick={closeMobileFilter}
      id={filterContainerID}
    >
      <button
        className={classes.closeButton}
        aria-label="Fechar os filtros"
        aria-controls={filterContainerID}
      >
        <SVGChevronLeft aria-hidden="true" />
      </button>
      <div className={classes.filters} data-expanded={showFilter}>
        <CatalogFilterCategories
          field={filterForm.fields.category}
          updateCategory={updateCategory}
        />
        <button
          className={`dneutral-light bg-lneutral-light text-small ${classes.cleanButton}`}
          onClick={resetPriceAndTags}
        >
          Limpar Filtros
        </button>
        <CatalogFilterPrices filterForm={filterForm} />
        {filterForm.fields.category.value in TAGS && (
          <CatalogFilterTags
            id="tags"
            groups={TAGS[filterForm.fields.category.value as keyof typeof TAGS]}
            field={filterForm.fields.tags}
            updateField={filterForm.updateField}
          />
        )}
      </div>
    </form>
  );
};

export default CatalogFilter;
