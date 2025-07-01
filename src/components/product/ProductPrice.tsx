import parsePrice from "@utils/parsePrice";

interface ProductPriceProps {
  className?: string;
  price: number;
  cashDiscount: number;
}

const ProductPrice = ({
  price,
  cashDiscount,
  className,
}: ProductPriceProps) => {
  return (
    <span className={`lneutral-xdark text-small ${className || ""}`}>
      R$
      <span className="dneutral-dark text-large"> {parsePrice(price)} </span>
      no PIX ({cashDiscount}% OFF)
    </span>
  );
};

export default ProductPrice;
