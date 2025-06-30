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
        {(cardPrice / 100).toLocaleString("pt-BR")}{" "}
      </span>
      no cartão <br /> em até {maxInstallments}x de R$
      <span className="dneutral-dark text-default">
        {" "}
        {(installmentsPrice / 100).toLocaleString("pt-BR")}
      </span>
    </span>
  );
};

export default CardPrice;
