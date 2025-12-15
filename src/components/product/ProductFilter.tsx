import type { MouseEventHandler } from "react";

import ProductFilterTags from "./ProductFilterTags";
import ProductFilterPrices from "./ProductFilterPrices";
import InputRadio from "@components/inputs/InputRadio";

import type { JafhForm } from "@hooks/useJafh";

import SVGChevronLeft from "@svg/chevronLeft.svg?react";

import { CATEGORIES, TAGS_WITH_LEGENDS } from "../../data";

import classes from "./ProductFilter.module.css";

const CATEGORIES_RADIO_OPTIONS = CATEGORIES.map((category) => ({
  label: category.label,
  value: category.name,
}));

const MOBILE_MAX_WIDTH = 900;

type Props = {
  filterForm: JafhForm<{
    category: string;
    minPrice: string;
    maxPrice: string;
    tags: [string, string][];
  }>;
  filterContainerID: string;
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductFilter = ({
  filterForm,
  filterContainerID,
  showFilter,
  setShowFilter,
}: Props) => {
  const resetPriceAndTags = () => {
    filterForm.updateField("minPrice", "");
    filterForm.updateField("maxPrice", "");
    filterForm.updateField("tags", []);
  };

  const closeMobileFilter: MouseEventHandler<HTMLFormElement> = (e) => {
    if (
      e.target instanceof HTMLFormElement &&
      window.innerWidth <= MOBILE_MAX_WIDTH
    ) {
      setShowFilter(false);
    }
  };

  return (
    <form
      className={`${classes.container}`}
      style={
        showFilter
          ? {
              opacity: "1",
              pointerEvents: "all",
            }
          : undefined
      }
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
      }}
      onClick={closeMobileFilter}
      id={filterContainerID}
    >
      <button
        className={`${classes.closeButton}`}
        aria-label="Fechar os filtros"
        aria-controls={filterContainerID}
      >
        <SVGChevronLeft />
      </button>
      <div
        className={`${classes.filters}`}
        style={{
          transform: showFilter ? "" : "translateX(-101%)",
        }}
      >
        <div className={`${classes.categorySelection}`}>
          <h2 className="dneutral text-default-b">Departamentos</h2>
          <fieldset className={`${classes.categoryInput}`}>
            <InputRadio
              labelStyles="dneutral text-small"
              id="category"
              options={CATEGORIES_RADIO_OPTIONS}
              field={filterForm.fields.category}
              updateField={filterForm.updateField}
            />
          </fieldset>
        </div>
        <button
          className={`dneutral-light bg-lneutral-light text-small ${classes.cleanButton}`}
          onClick={resetPriceAndTags}
        >
          Limpar Filtros
        </button>
        <ProductFilterPrices filterForm={filterForm} />
        {filterForm.fields.category.value in TAGS_WITH_LEGENDS && (
          <ProductFilterTags
            id="tags"
            groups={
              TAGS_WITH_LEGENDS[
                filterForm.fields.category
                  .value as keyof typeof TAGS_WITH_LEGENDS
              ]
            }
            field={filterForm.fields.tags}
            updateField={filterForm.updateField}
          />
        )}
      </div>
    </form>
  );
};

export default ProductFilter;
