import ProductCard from "./card/ProductCard";

type Props = {
  products: IProduct_Card[];
  mode: "default" | "sale" | "hideActions";
  className?: string;
};

const ProductList = ({ products, mode, className }: Props) => {
  return (
    <ul className={className || ""}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} mode={mode} />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
