import InputRadio from "@components/inputs/InputRadio";
import classes from "./ProductFilter.module.css";

const CATEGORIES_RADIO_OPTIONS = [
  { label: "Placas de Vídeo", value: "gpu" },
  { label: "Placas-mãe", value: "moba" },
  { label: "Processadores", value: "cpu" },
  { label: "Memórias RAM", value: "ram" },
  { label: "SSD's", value: "ssd" },
  { label: "HD's", value: "hdd" },
];

const ProductFilter = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleTest = (id: string, value: string) => {
    console.log(id, value);
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
          handler={handleTest}
        />
      </div>
    </form>
  );
};

export default ProductFilter;
