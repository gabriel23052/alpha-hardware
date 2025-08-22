import { useParams } from "react-router";

import Product from "@components/product/Product";
import RecentlyViewed from "@components/RecentlyViewed";

import usePageTitle from "@hooks/usePageTitle";

const ProductRoute = () => {
  usePageTitle("Alpha Hardware - Produto");
  const { productId } = useParams<{ productId: string }>();

  return (
    <main>
      <Product productId={productId || ""} />
      <RecentlyViewed />
    </main>
  );
};

export default ProductRoute;
