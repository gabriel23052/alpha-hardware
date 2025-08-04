import ProductCard from "./ProductCard";

type ProductListProps = {
  products: IProduct[];
  showSale: boolean;
  showButtons: boolean;
  className?: string;
};
const ProductList = ({
  products,
  showSale,
  showButtons,
  className,
}: ProductListProps) => {
  return (
    <ul className={className || ""}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            showSale={showSale}
            showButtons={showButtons}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
