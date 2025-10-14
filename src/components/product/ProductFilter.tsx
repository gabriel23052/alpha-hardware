import { useEffect } from "react";

import InputRadio from "@components/inputs/InputRadio";
import ProductFilterTags from "./ProductFilterTags";
import ProductFilterPrices from "./ProductFilterPrices";

import useForm from "@hooks/useForm";
import useDebounce from "@hooks/useDebounce";

import classes from "./ProductFilter.module.css";

// prettier-ignore
const TAGS_WITH_LABELS = {
  moba: [
    { label: "Fabricante", values: ["Asus", "Gigabyte", "MSI", "ASRock", "Colorful"] },
    { label: "Socket", values: ["AMD", "Intel"] },
    { label: "Memória", values: ["DDR4", "DDR5"] },
  ],
  gpu: [
    { label: "Plataforma", values: ["NVidia", "AMD"] },
    { label: "Fabricante", values: ["Asus", "Gigabyte", "MSI", "Sapphire", "XFX", "Palit", "PCyes", "ASRock"] },
    { label: "VRAM", values: ["4GB", "6GB", "8GB", "12GB", "16GB"] },
  ],
  cpu: [
    { label: "Fabricante", values: ["Intel", "AMD"] },
    { label: "Socket", values: ["LGA1700", "LGA1200", "AM4", "AM5"] },
  ],
  ram: [
    { label: "Fabricante", values: ["Kingston", "Rise Mode", "XPG", "Corsair", "Lexar"] },
    { label: "Barramento", values: ["DDR3", "DDR4", "DDR5"] },
    { label: "Capacidade", values: ["8GB", "16GB", "16GB (2x8GB)", "32GB (2x16GB)"] },
  ],
  ssd: [
    { label: "Fabricante", values: ["Corsair", "Kingston", "Rise Mode", "Sandisk", "WD", "Husky", "Lexar", "Adata"] },
    { label: "Capacidade", values: ["120GB", "128GB", "240GB", "256GB", "480GB", "500GB", "960GB", "1TB", "2TB", "4TB"] },
  ],
  hdd: [
    { label: "Fabricante", values: ["WD", "Toshiba", "Seagate"] },
    { label: "Tipo", values: ["Interno", "Externo"] },
    { label: "Capacidade", values: ["1TB", "2TB", "4TB", "5TB", "6TB", "8TB", "16TB", "18TB", "22TB"] },
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

const UPDATE_DELAY = 2000;

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<IFakeApiProductFilter>>;
};

const ProductFilter = ({ setFilter }: Props) => {
  const { fields, fieldHandler, validForm } = useForm({
    category: { initialValue: "", validation: null },
    tags: { initialValue: [], validation: null },
    minPrice: { initialValue: "", validation: "priceFilter" },
    maxPrice: { initialValue: "", validation: "priceFilter" },
  } as const);

  useEffect(() => {
    if (fields.category.value === "") return;
    cleanFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.category.value]);

  useEffect(() => {
    debouncedUpdateFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  const debouncedUpdateFilter = useDebounce(() => {
    if (!validForm) return;
    const { category, tags, minPrice, maxPrice } = { ...fields };
    const filter: IFakeApiProductFilter = {};
    if (category.value.length > 0) filter.category = category.value;
    if (tags.value.length > 0) filter.tags = tags.value;
    filter.minPrice = Number(minPrice.value.replace(",", ".")) * 100;
    filter.maxPrice = Number(maxPrice.value.replace(",", ".")) * 100;
    setFilter((prev) => {
      return { ...prev, ...filter };
    });
  }, UPDATE_DELAY);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const cleanFilters = () => {
    fieldHandler("minPrice", "");
    fieldHandler("maxPrice", "");
    fieldHandler("tags", []);
  };

  return (
    <form onSubmit={handleSubmit} className={`${classes.productFilter}`}>
      <div className={`${classes.categorySelection}`}>
        <h2 className="dneutral text-default-b">Departamentos</h2>
        <InputRadio
          containerClassName={`${classes.categoryInput}`}
          labelStyles="dneutral text-small"
          id="category"
          options={CATEGORIES_RADIO_OPTIONS}
          field={fields.category}
          fieldHandler={fieldHandler}
        />
      </div>
      <button
        className={`secondary-xdark bg-white text-small ${classes.cleanButton}`}
        onClick={cleanFilters}
      >
        Limpar Filtros
      </button>
      <ProductFilterPrices fields={fields} fieldHandler={fieldHandler} />
      {fields.category.value && (
        <ProductFilterTags
          tags={TAGS_WITH_LABELS[fields.category.value]}
          field={fields.tags}
          fieldHandler={fieldHandler}
        />
      )}
    </form>
  );
};

export default ProductFilter;
