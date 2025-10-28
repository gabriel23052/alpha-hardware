import { useEffect, useState, type FocusEvent } from "react";

import InputNumber from "@components/inputs/InputNumber";

import type { JafhForm } from "@hooks/useJafh";

import classes from "./ProductFilterPrices.module.css";

type Props = {
  filterForm: JafhForm<{ minPrice: string; maxPrice: string }>;
};

const ProductFilterPrices = ({ filterForm }: Props) => {
  const [minBlurred, setMinBlurred] = useState(false);
  const [maxBlurred, setMaxBlurred] = useState(false);
  const [minGreaterThanMax, setMinGreaterThanMax] = useState(false);

  useEffect(() => {
    const minPrice = Math.floor(
      Number(filterForm.fields.minPrice.value.replace(",", ".")) * 100
    );
    const maxPrice = Math.floor(
      Number(filterForm.fields.maxPrice.value.replace(",", ".")) * 100
    );

    if (maxPrice > 0 && minPrice > maxPrice) {
      setMinGreaterThanMax(true);
      return;
    }
    setMinGreaterThanMax(false);
  }, [filterForm.fields.maxPrice.value, filterForm.fields.minPrice.value]);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.id === "minPrice") {
      setMinBlurred(true);
      return;
    }
    setMaxBlurred(true);
  };

  return (
    <div className={`${classes.priceSelection}`}>
      <h2 className="dneutral text-default-b">Preço</h2>
      <div className={`${classes.container}`}>
        <label
          className={`dneutral text-small ${
            filterForm.fields.minPrice.error && minBlurred ? classes.error : ""
          }`}
          htmlFor="minPrice"
        >
          Mínimo:
        </label>
        <InputNumber
          className="dneutral bg-lneutral-xlight text-small"
          id="minPrice"
          maxLength={8}
          placeholder="0,00"
          autoComplete="off"
          onBlur={handleBlur}
          field={filterForm.fields.minPrice}
          updateField={filterForm.updateField}
        />
        <label
          className={`dneutral text-small ${
            filterForm.fields.maxPrice.error && maxBlurred ? classes.error : ""
          }`}
          htmlFor="minPrice"
        >
          Máximo:
        </label>
        <InputNumber
          className="dneutral bg-lneutral-xlight text-small"
          id="maxPrice"
          maxLength={8}
          placeholder="0,00"
          autoComplete="off"
          onBlur={handleBlur}
          field={filterForm.fields.maxPrice}
          updateField={filterForm.updateField}
        />
        {minBlurred && maxBlurred ? (
          filterForm.fields.minPrice.error ||
          filterForm.fields.maxPrice.error ? (
            <span className="primary text-small">
              {filterForm.fields.minPrice.error ||
                filterForm.fields.maxPrice.error}
            </span>
          ) : (
            minGreaterThanMax && (
              <span className="primary text-small">
                Preço mínimo maior que o máximo
              </span>
            )
          )
        ) : null}
      </div>
    </div>
  );
};

export default ProductFilterPrices;
