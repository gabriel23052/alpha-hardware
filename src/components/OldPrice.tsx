import parsePrice from "../utils/parsePrice";

interface OldPriceProps {
  className?: string;
  oldPrice: number;
}

const OldPrice = ({ oldPrice, className }: OldPriceProps) => {
  return (
    <span
      className={`dneutral-xlight text-default ${className || ""}`}
      style={{
        textDecoration: "line-through",
      }}
    >
      R$ {parsePrice(oldPrice)}
    </span>
  );
};

export default OldPrice;
