import ProductCard from "./ProductCard";
import classes from "./ProductSelection.module.css";

const ProductSelection = ({
  productSelection,
}: {
  productSelection: IProductSelection;
}) => {
  const { title, products } = productSelection;

  return (
    <article className={`defaultContainer ${classes.productSelection}`}>
      <div className={`${classes.titleWithLine}`}>
        <h2 className={`dneutral-dark text-verylarge-m ${classes.title}`}>
          {title}
        </h2>
      </div>
      <div className={classes.products}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showButtons={true}
            showSale={false}
          />
        ))}
      </div>
    </article>
  );
};

export default ProductSelection;
