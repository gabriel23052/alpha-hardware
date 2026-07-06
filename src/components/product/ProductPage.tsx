import { useParams } from "react-router";

import Product from "@components/product/Product";
import RecentlyViewed from "@components/recentlyViewed/RecentlyViewed";

import usePageTitle from "@hooks/usePageTitle";

const ProductPage = () => {
  usePageTitle("Alpha Hardware - Produto");
  const { productId } = useParams<{ productId: string }>();

  return (
    <main>
      <Product productId={productId || ""} />
      <RecentlyViewed />
    </main>
  );
};

export default ProductPage;
