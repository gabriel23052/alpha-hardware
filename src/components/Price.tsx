import parsePrice from "../utils/parsePrice";

interface PriceProps {
  className?: string;
  price: number;
  cashDiscount: number;
}

const Price = ({ price, cashDiscount, className }: PriceProps) => {
  return (
    <span className={`lneutral-xdark text-small ${className || ""}`}>
      R$
      <span className="dneutral-dark text-large"> {parsePrice(price)} </span>
      no PIX ({cashDiscount}% OFF)
    </span>
  );
};

export default Price;
