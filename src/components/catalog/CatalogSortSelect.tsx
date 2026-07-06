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
  { value: "alphabetical", label: "Ordem alfabética" },
  { value: "increasingPrice", label: "Preço crescente" },
  { value: "decreasingPrice", label: "Preço decrescente" },
];

const CatalogSortSelect = ({ field, updateField }: Props) => {
  return (
    <div className={classes.container}>
      <InputSelect
        className={`text-small bg-lneutral-xlight dneutral-light ${classes.select}`}
        options={SORT_OPTIONS}
        id="sort"
        field={field}
        updateField={updateField}
        title="Ordenação dos produtos"
      />
      <SVGSort aria-hidden="true" />
    </div>
  );
};

export default CatalogSortSelect;
