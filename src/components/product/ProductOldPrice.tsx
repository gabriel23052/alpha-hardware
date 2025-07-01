import parsePrice from "@utils/parsePrice";

interface ProductOldPriceProps {
  className?: string;
  oldPrice: number;
}

const ProductOldPrice = ({ oldPrice, className }: ProductOldPriceProps) => {
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

export default ProductOldPrice;
