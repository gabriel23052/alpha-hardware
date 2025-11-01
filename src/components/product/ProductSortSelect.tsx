import InputSelect from "@components/inputs/InputSelect";

import type { Field, UpdateField } from "@hooks/useJafh";

import SVGSort from "@svg/sort.svg?react";

import classes from "./ProductSortDropdown.module.css";

type Props = {
  field: Field<string>;
  updateField: UpdateField<string>;
};

const SORT_OPTIONS = [
  { value: "", label: "Nenhuma" },
  { value: "increasingPrice", label: "Preço crescente" },
  { value: "decreasingPrice", label: "Preço descrescente" },
];

const ProductSortSelect = ({ field, updateField }: Props) => {
  return (
    <div className={`${classes.container}`}>
      <InputSelect
        className={`bg-lneutral-light dneutral-light text-small ${classes.select}`}
        options={SORT_OPTIONS}
        id="sortBy"
        field={field}
        updateField={updateField}
      />
      <SVGSort />
    </div>
  );
};

export default ProductSortSelect;
