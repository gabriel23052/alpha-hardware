import ProductCard from "./ProductCard";

type Props = {
  products: IProduct[];
  hideSale?: boolean;
  hideButtons?: boolean;
  className?: string;
};

const ProductList = ({
  products,
  hideSale,
  hideButtons,
  className,
}: Props) => {
  return (
    <ul className={className || ""}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            hideSale={hideSale}
            hideButtons={hideButtons}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
