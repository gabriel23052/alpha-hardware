import { useParams } from "react-router";

import Product from "@components/product/Product";
import RecentlyViewed from "@components/recentlyViewed/RecentlyViewed";

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();

  return (
    <main>
      <Product productId={productId || ""} />
      <RecentlyViewed />
    </main>
  );
};

export default ProductPage;
