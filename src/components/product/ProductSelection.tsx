import ProductList from "./ProductList";

import classes from "./ProductSelection.module.css";

const ProductSelection = ({
  productSelection,
}: {
  productSelection: IProductGroup;
}) => {
  const { meta, products } = productSelection;

  return (
    <article className={`defaultContainer ${classes.productSelection}`}>
      <div className={`${classes.titleWithLine}`}>
        {meta && meta.title && (
          <h2 className={`dneutral-dark text-verylarge-m ${classes.title}`}>
            {meta.title}
          </h2>
        )}
      </div>
      <ProductList
        products={products}
        hideSale={true}
        className={classes.products}
      />
    </article>
  );
};

export default ProductSelection;
