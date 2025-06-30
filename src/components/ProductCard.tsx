import { Link } from "react-router";

import classes from "./styles/ProductCard.module.css";

import SVGCartAdd from "../assets/svg/cartAdd.svg?react";

import Price from "./Price";
import CardPrice from "./CardPrice";

type ProductCardProps = { product: IProduct };

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to="/" className={`${classes.productCard}`}>
      <div className={`${classes.thumb}`}>
        <img src={product.imagesSrc.thumb} alt={product.name} />
      </div>
      <div className={`${classes.wrapper}`}>
        <span className={`dneutral text-small-b ${classes.name}`}>
          {product.name}
        </span>
        <Price
          className={`${classes.price}`}
          price={product.price}
          cashDiscount={product.cashDiscount}
        />
        <CardPrice
          cardPrice={product.cardPrice}
          installmentsPrice={product.installmentsPrice}
          maxInstallments={product.maxInstallments}
        />
        <div className={`${classes.buttonsContainer}`}>
          <Link to="" className="lneutral-xlight bg-primary text-default-b">
            COMPRAR
          </Link>
          <button className="bg-lneutral-xlight">
            <SVGCartAdd />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
