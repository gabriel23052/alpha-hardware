import type { TProduct } from "../../../app.types";
import Card from "../card/Card";

type Props = {
  products: TProduct["card"][];
  mode: "default" | "sale" | "hideActions";
  className?: string;
};

const Grid = ({ products, mode, className }: Props) => {
  return (
    <ul className={className || ""}>
      {products.map((product) => (
        <li key={product.id}>
          <Card product={product} mode={mode} />
        </li>
      ))}
    </ul>
  );
};

export default Grid;
