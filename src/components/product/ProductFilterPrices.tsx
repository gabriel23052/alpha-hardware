import InputNumber from "@components/inputs/InputNumber";

import classes from "./ProductFilterPrices.module.css";

type Props = {
  data: { minPrice: string; maxPrice: string };
  handler: (id: string, value: string) => void;
};

const ProductFilterPrices = ({ data, handler }: Props) => {
  return (
    <div className={`${classes.priceSelection}`}>
      <h2 className="dneutral text-default-b">Preço</h2>
      <div className={`${classes.container}`}>
        <label className="dneutral text-small" htmlFor="minPrice">
          Mínimo:
        </label>
        <InputNumber
          className="dneutral bg-lneutral-xlight text-small"
          id="minPrice"
          value={data.minPrice}
          handler={handler}
          maxLength={8}
          placeholder="0,00"
        />
        <label className="dneutral text-small" htmlFor="minPrice">
          Máximo:
        </label>
        <InputNumber
          className="dneutral bg-lneutral-xlight text-small"
          id="maxPrice"
          value={data.maxPrice}
          handler={handler}
          maxLength={8}
          placeholder="0,00"
        />
      </div>
    </div>
  );
};

export default ProductFilterPrices;
