import { useEffect, useState, type FocusEvent } from "react";

import InputNumber from "@components/inputs/InputNumber";

import classes from "./ProductFilterPrices.module.css";

type Props = {
  fields: { minPrice: IFormField<string>; maxPrice: IFormField<string> };
  fieldHandler: (id: string, value: IJsonValue) => void;
};

const ProductFilterPrices = ({ fields, fieldHandler }: Props) => {
  const [minBlurred, setMinBlurred] = useState(false);
  const [maxBlurred, setMaxBlurred] = useState(false);
  const [minGreaterThanMax, setMinGreaterThanMax] = useState(false);

  useEffect(() => {
    const minPrice = Math.floor(
      Number(fields.minPrice.value.replace(",", ".")) * 100
    );
    const maxPrice = Math.floor(
      Number(fields.maxPrice.value.replace(",", ".")) * 100
    );

    if (maxPrice > 0 && minPrice > maxPrice) {
      setMinGreaterThanMax(true);
      return;
    }
    setMinGreaterThanMax(false);
  }, [fields.maxPrice.value, fields.minPrice.value]);

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
            fields.minPrice.error && minBlurred ? classes.error : ""
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
          field={fields.minPrice}
          fieldHandler={fieldHandler}
        />
        <label
          className={`dneutral text-small ${
            fields.maxPrice.error && maxBlurred ? classes.error : ""
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
          field={fields.maxPrice}
          fieldHandler={fieldHandler}
        />
        {minBlurred && maxBlurred ? (
          fields.minPrice.error || fields.maxPrice.error ? (
            <span className="primary text-small">
              {fields.minPrice.error || fields.maxPrice.error}
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
