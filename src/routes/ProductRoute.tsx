import { useParams } from "react-router";

import Product from "@components/product/Product";
import ProductsAPI from "../fakeAPI/ProductsAPI";
import ProductNotFound from "@components/product/ProductNotFound";
import RecentlyViewed from "@components/RecentlyViewed";
import usePageTitle from "../hooks/usePageTitle";

const ProductRoute = () => {
  // Temporário
  usePageTitle("Alpha Hardware - Produto");
  const { productId } = useParams<{ productId: string }>();
  if (productId === undefined) {
    return <ProductNotFound />;
  }
  const productsApi = new ProductsAPI();
  const product = productsApi.getProductsById(productId)[0];
  if (product === undefined) {
    return <ProductNotFound />;
  }
  const recentlyViewed = productsApi.getRecentlyViewedProducts();

  return (
    <main>
      <Product product={product} />
      <RecentlyViewed productSelection={recentlyViewed} />
    </main>
  );
};

export default ProductRoute;
