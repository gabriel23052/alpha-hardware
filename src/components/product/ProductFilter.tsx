import type { MouseEventHandler } from "react";

import ProductFilterTags from "./ProductFilterTags";
import ProductFilterPrices from "./ProductFilterPrices";
import InputRadio from "@components/inputs/InputRadio";

import type { JafhForm } from "@hooks/useJafh";

import SVGChevronLeft from "@svg/chevronLeft.svg?react";

import classes from "./ProductFilter.module.css";

// prettier-ignore
const TAGS_WITH_LEGENDS = {
  moba: [
    { legend: "Fabricante", values: ["Asus", "Gigabyte", "MSI", "ASRock", "Colorful"] },
    { legend: "Socket", values: ["AMD", "Intel"] },
    { legend: "Memória", values: ["DDR4", "DDR5"] },
  ],
  gpu: [
    { legend: "Plataforma", values: ["NVidia", "AMD"] },
    { legend: "Fabricante", values: ["Asus", "Gigabyte", "MSI", "Sapphire", "XFX", "Palit", "PCyes", "ASRock"] },
    { legend: "VRAM", values: ["4GB", "6GB", "8GB", "12GB", "16GB"] },
  ],
  cpu: [
    { legend: "Fabricante", values: ["Intel", "AMD"] },
    { legend: "Socket", values: ["LGA1700", "LGA1200", "AM4", "AM5"] },
  ],
  ram: [
    { legend: "Fabricante", values: ["Kingston", "Rise Mode", "XPG", "Corsair", "Lexar"] },
    { legend: "Barramento", values: ["DDR3", "DDR4", "DDR5"] },
    { legend: "Capacidade", values: ["8GB", "16GB", "16GB (2x8GB)", "32GB (2x16GB)"] },
  ],
  ssd: [
    { legend: "Fabricante", values: ["Corsair", "Kingston", "Rise Mode", "Sandisk", "WD", "Husky", "Lexar", "Adata"] },
    { legend: "Capacidade", values: ["120GB", "128GB", "240GB", "256GB", "480GB", "500GB", "960GB", "1TB", "2TB", "4TB"] },
  ],
  hdd: [
    { legend: "Fabricante", values: ["WD", "Toshiba", "Seagate"] },
    { legend: "Tipo", values: ["Interno", "Externo"] },
    { legend: "Capacidade", values: ["1TB", "2TB", "4TB", "5TB", "6TB", "8TB", "16TB", "18TB", "22TB"] },
  ],
};

const CATEGORIES_RADIO_OPTIONS = [
  { label: "Placas de Vídeo", value: "gpu" },
  { label: "Placas-mãe", value: "moba" },
  { label: "Processadores", value: "cpu" },
  { label: "Memórias RAM", value: "ram" },
  { label: "SSD's", value: "ssd" },
  { label: "HD's", value: "hdd" },
];

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
    if (e.target instanceof HTMLFormElement) {
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
          <InputRadio
            containerClassName={`${classes.categoryInput}`}
            labelStyles="dneutral text-small"
            id="category"
            options={CATEGORIES_RADIO_OPTIONS}
            field={filterForm.fields.category}
            updateField={filterForm.updateField}
          />
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
