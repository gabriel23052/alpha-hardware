import InputNumber from "@components/inputs/InputNumber";

import classes from "./ProductFilterPrices.module.css";

type Props = {
  data: { minPrice: IFormValue<string>; maxPrice: IFormValue<string> };
  handler: (id: string, value: IJsonValue) => void;
};

const ProductFilterPrices = ({ data, handler }: Props) => {
  return (
    <div className={`${classes.priceSelection}`}>
      <h2 className="dneutral text-default-b">Preço</h2>
      <div className={`${classes.container}`}>
        <label
          className={`dneutral text-small ${
            data.minPrice.error ? classes.error : ""
          }`}
          htmlFor="minPrice"
        >
          Mínimo:
        </label>
        <InputNumber
          className="dneutral bg-lneutral-xlight text-small"
          id="minPrice"
          val={data.minPrice}
          handler={handler}
          maxLength={8}
          placeholder="0,00"
        />
        <label
          className={`dneutral text-small ${
            data.maxPrice.error ? classes.error : ""
          }`}
          htmlFor="minPrice"
        >
          Máximo:
        </label>
        <InputNumber
          className="dneutral bg-lneutral-xlight text-small"
          id="maxPrice"
          val={data.maxPrice}
          handler={handler}
          maxLength={8}
          placeholder="0,00"
        />
        {data.minPrice.error || data.maxPrice.error ? (
          <span className="primary text-small">
            {data.minPrice.error || data.maxPrice.error}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default ProductFilterPrices;
