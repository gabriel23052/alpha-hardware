import { Link } from "react-router";
import classes from "./ProductSale.module.css";
import ProductList from "./ProductList";

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
      <ProductList
        products={products}
        showSale={true}
        showButtons={false}
        className={`${classes.products}`}
      />
    </article>
  );
};

export default ProductSale;
