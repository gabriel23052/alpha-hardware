import { Link } from "react-router";
import ProductCard from "./ProductCard";
import classes from "./ProductSale.module.css";

const ProductSale = ({ saleSelection }: { saleSelection: ISaleSelection }) => {
  return (
    <article className={`defaultContainer ${classes.productSale}`}>
      <Link className={`${classes.title}`} to={"/"}>
        <h2 className={`secondary-light text-display`}>
          {saleSelection.title}
        </h2>
      </Link>
      <div className={`${classes.products}`}>
        {saleSelection.products.map((product) => (
          <ProductCard key={product.id} product={product} buttons={true} showSale={true} />
        ))}
      </div>
    </article>
  );
};

export default ProductSale;
