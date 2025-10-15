import { Link } from "react-router";

import ProductList from "./ProductList";

import classes from "./ProductSale.module.css";

const ProductSale = ({
  productSelection,
}: {
  productSelection: IProductGroup;
}) => {
  const { meta, products } = productSelection;

  return (
    <article className={`defaultContainer ${classes.productSale}`}>
      {meta && meta.title && (
        <Link className={`${classes.title}`} to={"/"}>
          <h2 className={`secondary-light text-display`}>{meta.title}</h2>
        </Link>
      )}
      <ProductList products={products} className={`${classes.products}`} />
    </article>
  );
};

export default ProductSale;
