import { useState, type FocusEvent } from "react";

import InputNumber from "@components/inputs/InputNumber";

import type { JafhForm } from "@hooks/useJafh";

import SVGError from "@svg/error.svg?react";

import classes from "./CatalogFilterPrices.module.css";

type Props = {
  filterForm: JafhForm<{ minPrice: string; maxPrice: string }>;
};

const CatalogFilterPrices = ({ filterForm }: Props) => {
  const [minBlurred, setMinBlurred] = useState(false);
  const [maxBlurred, setMaxBlurred] = useState(false);

  const getErrorIfExists = () => {
    if (!minBlurred || !maxBlurred) return null;
    if (filterForm.fields.minPrice.error || filterForm.fields.maxPrice.error) {
      return (
        filterForm.fields.minPrice.error || filterForm.fields.maxPrice.error
      );
    }

    const minPrice = Math.floor(
      Number(filterForm.fields.minPrice.value.replace(",", ".")) * 100,
    );
    const maxPrice = Math.floor(
      Number(filterForm.fields.maxPrice.value.replace(",", ".")) * 100,
    );
    if (filterForm.fields.maxPrice.value !== "" && minPrice > maxPrice) {
      return "Mínimo maior que o máximo";
    }

    return null;
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.id === "minPrice") {
      setMinBlurred(true);
      return;
    }
    setMaxBlurred(true);
  };

  return (
    <div className={classes.container}>
      <h2 className="text-default-b dneutral">Preço</h2>
      <fieldset className={classes.fields}>
        <div className={classes.field}>
          <label className="text-small dneutral" htmlFor="minPrice">
            Mínimo:
          </label>
          <InputNumber
            className="text-small dneutral bg-lneutral-xlight"
            id="minPrice"
            maxLength={8}
            placeholder="0,00"
            autoComplete="off"
            onBlur={handleBlur}
            field={filterForm.fields.minPrice}
            updateField={filterForm.updateField}
          />
          {filterForm.fields.minPrice.error && minBlurred && (
            <SVGError aria-hidden="true" width={16} height={16} />
          )}
        </div>
        <div className={classes.field}>
          <label className="text-small dneutral" htmlFor="minPrice">
            Máximo:
          </label>
          <InputNumber
            className="text-small dneutral bg-lneutral-xlight"
            id="maxPrice"
            maxLength={8}
            placeholder="0,00"
            autoComplete="off"
            onBlur={handleBlur}
            field={filterForm.fields.maxPrice}
            updateField={filterForm.updateField}
          />
          {filterForm.fields.maxPrice.error && maxBlurred && (
            <SVGError aria-hidden="true" width={16} height={16} />
          )}
        </div>
        {getErrorIfExists() && (
          <span className="text-small primary">{getErrorIfExists()}</span>
        )}
      </fieldset>
    </div>
  );
};

export default CatalogFilterPrices;
