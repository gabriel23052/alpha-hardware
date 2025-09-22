import { useEffect } from "react";

import InputRadio from "@components/inputs/InputRadio";
import ProductFilterTags from "./ProductFilterTags";

import useForm from "@hooks/useForm";

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

const ProductFilter = () => {
  const { data, changeData } = useForm<{
    category: keyof typeof TAGS_WITH_LABELS | "";
    tags: string[];
  }>({
    category: "",
    tags: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    changeData("tags", []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.category]);

  return (
    <form onSubmit={handleSubmit} className={`${classes.productFilter}`}>
      <div className={`${classes.categorySelection}`}>
        <h2 className="dneutral text-default-b">Departamentos</h2>
        <InputRadio
          containerClassName={`${classes.categoryInput}`}
          labelStyles="dneutral text-small"
          id="category"
          options={CATEGORIES_RADIO_OPTIONS}
          value={data.category}
          handler={changeData}
        />
      </div>
      {data.category && (
        <ProductFilterTags
          tags={TAGS_WITH_LABELS[data.category]}
          value={data.tags}
          handler={changeData}
        />
      )}
    </form>
  );
};

export default ProductFilter;
