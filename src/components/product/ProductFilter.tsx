import InputRadio from "@components/inputs/InputRadio";
import classes from "./ProductFilter.module.css";
import useForm from "@hooks/useForm";

const CATEGORIES_RADIO_OPTIONS = [
  { label: "Placas de Vídeo", value: "gpu" },
  { label: "Placas-mãe", value: "moba" },
  { label: "Processadores", value: "cpu" },
  { label: "Memórias RAM", value: "ram" },
  { label: "SSD's", value: "ssd" },
  { label: "HD's", value: "hdd" },
];

const ProductFilter = () => {
  const { data, handleChange } = useForm<{ category: string; tags: string[] }>({
    category: "",
    tags: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          value={data.category}
          handler={handleChange}
        />
      </div>
    </form>
  );
};

export default ProductFilter;
