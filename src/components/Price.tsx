interface PriceProps {
  className?: string;
  price: number;
  cashDiscount: number;
}

const Price = ({ price, cashDiscount, className }: PriceProps) => {
  return (
    <span className={`lneutral-xdark text-small ${className || ""}`}>
      R$
      <span className="dneutral-dark text-large">
        {" "}
        {(price / 100).toLocaleString("pt-BR")}{" "}
      </span>
      no PIX ({cashDiscount}% OFF)
    </span>
  );
};

export default Price;
