import InputSelect from "@components/inputs/InputSelect";

import type { JafhField, JafhUpdateField } from "@hooks/useJafh";

import SVGSort from "@svg/sort.svg?react";

import classes from "./CatalogSortSelect.module.css";

type Props = {
  field: JafhField<string>;
  updateField: JafhUpdateField<string>;
};

const SORT_OPTIONS = [
  { value: "", label: "Sem ordenação" },
  { value: "increasingPrice", label: "Preço crescente" },
  { value: "decreasingPrice", label: "Preço descrescente" },
];

const CatalogSortSelect = ({ field, updateField }: Props) => {
  return (
    <div className={`${classes.container}`}>
      <InputSelect
        className={`bg-lneutral-xlight dneutral-light text-small ${classes.select}`}
        options={SORT_OPTIONS}
        id="sortBy"
        field={field}
        updateField={updateField}
      />
      <SVGSort />
    </div>
  );
};

export default CatalogSortSelect;
