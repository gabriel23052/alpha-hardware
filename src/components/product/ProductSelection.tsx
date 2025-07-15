import ProductCard from "./ProductCard";
import classes from "./ProductSelection.module.css";

const ProductSelection = ({
  productSelection,
}: {
  productSelection: IProductSelection;
}) => {
  return (
    <article className={`defaultContainer ${classes.productSelection}`}>
      <div className={`${classes.titleWithLine}`}>
        <h2 className={`dneutral-dark text-verylarge-m ${classes.title}`}>
          {productSelection.title}
        </h2>
      </div>
      <div className={classes.products}>
        {productSelection.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            buttons={true}
            showSale={false}
          />
        ))}
      </div>
    </article>
  );
};

export default ProductSelection;
