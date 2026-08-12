import SVGSort from "@svg/sort.svg?react";

import classes from "./CatalogSortSelect.module.css";

type Props = {
  sort: IProductSort | undefined;
  setSort: (sort: IProductSort | "") => void;
};

const SORT_OPTIONS = [
  { value: "", label: "Sem ordenação" },
  { value: "alphabetical", label: "Ordem alfabética" },
  { value: "increasingPrice", label: "Preço crescente" },
  { value: "decreasingPrice", label: "Preço decrescente" },
];

const CatalogSortSelect = ({ sort, setSort }: Props) => {

  return (
    <div className={classes.container}>
      <select
        className={`text-small bg-lneutral-xlight dneutral-light ${classes.select}`}
        id="sort"
        name="sort"
        onChange={(e) => {
          setSort(e.target.value as IProductSort);
        }}
        value={sort || ""}
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
      <SVGSort aria-hidden="true" width={20} height={20} />
    </div>
  );
};

export default CatalogSortSelect;
