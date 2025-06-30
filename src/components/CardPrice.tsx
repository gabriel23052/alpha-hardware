import parsePrice from "../utils/parsePrice";

interface CardPriceProps {
  className?: string;
  cardPrice: number;
  installmentsPrice: number;
  maxInstallments: number;
}

const CardPrice = ({
  className,
  cardPrice,
  installmentsPrice,
  maxInstallments,
}: CardPriceProps) => {
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

export default CardPrice;
