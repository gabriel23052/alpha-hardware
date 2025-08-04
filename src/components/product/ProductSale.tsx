import { Link } from "react-router";
import ProductCard from "./ProductCard";
import classes from "./ProductSale.module.css";

const ProductSale = ({
  productSelection,
}: {
  productSelection: IProductSelection;
}) => {
  const { title, products } = productSelection;

  return (
    <article className={`defaultContainer ${classes.productSale}`}>
      <Link className={`${classes.title}`} to={"/"}>
        <h2 className={`secondary-light text-display`}>{title}</h2>
      </Link>
      <div className={`${classes.products}`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showButtons={true}
            showSale={true}
          />
        ))}
      </div>
    </article>
  );
};

export default ProductSale;
