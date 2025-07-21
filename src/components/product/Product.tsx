import classes from "./Product.module.css";

const Product = ({product}: {product: IProduct}) => {
  return (
    <article className="defaultContainer">
      <div className={`${classes.title}`}>
        <span className="lneutral-xdark text-small">{product.id}</span>
        <h1 className="dneutral text-verylarge">{product.name}</h1>
      </div>
    </article>
  );
};

export default Product;
