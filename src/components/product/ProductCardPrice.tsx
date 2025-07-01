import parsePrice from "@utils/parsePrice";

interface ProductCardPriceProps {
  className?: string;
  cardPrice: number;
  installmentsPrice: number;
  maxInstallments: number;
}

const ProductCardPrice = ({
  className,
  cardPrice,
  installmentsPrice,
  maxInstallments,
}: ProductCardPriceProps) => {
  return (
    <span className={`lneutral-xdark text-small ${className || ""}`}>
      R$
      <span className="dneutral-dark text-default">
        {" "}
        {parsePrice(cardPrice)}{" "}
      </span>
      no cartão <br /> em até {maxInstallments}x de R$
      <span className="dneutral-dark text-default">
        {" "}
        {parsePrice(installmentsPrice)}
      </span>
    </span>
  );
};

export default ProductCardPrice;
