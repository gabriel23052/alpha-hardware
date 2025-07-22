import classes from "./Product.module.css";
import ProductBuy from "./ProductBuy";
import ProductGallery from "./ProductGallery";

const Product = ({ product }: { product: IProduct }) => {
  return (
    <article className={`defaultContainer ${classes.product}`}>
      <div className={`${classes.title}`}>
        <span className="lneutral-xdark text-small">{product.id}</span>
        <h1 className="dneutral text-verylarge">{product.name}</h1>
      </div>
      <div className={`${classes.container}`}>
        <ProductGallery media={product.media} alt={product.name} />
        <ProductBuy product={product} />
      </div>
    </article>
  );
};

export default Product;
