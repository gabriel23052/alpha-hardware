import UnderlinedTitle from "@components/UnderlinedTitle";
import classes from "./ProductSpecSheet.module.css";

const ProductSpecSheet = () => {
  return (
    <div className={`${classes.specSheet}`}>
      <UnderlinedTitle>Ficha técnica</UnderlinedTitle>
      <dl>
        <div>
          <dt className="dneutral-dark text-default-b">Chave</dt>
          <dd className="dneutral text-default">Valor</dd>
        </div>
        <div>
          <dt className="dneutral-dark text-default-b">Chave</dt>
          <dd className="dneutral text-default">Valor</dd>
        </div>
        <div>
          <dt className="dneutral-dark text-default-b">Chave</dt>
          <dd className="dneutral text-default">Valor</dd>
        </div>
      </dl>
    </div>
  );
};

export default ProductSpecSheet;
