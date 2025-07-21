import { useParams } from "react-router";

import Product from "@components/product/Product";
import ProductsAPI from "../fakeAPI/ProductsAPI";
import ProductNotFound from "@components/product/ProductNotFound";

const ProductRoute = () => {
  // Temporário
  const { productId } = useParams<{ productId: string }>();
  if (productId === undefined) {
    return <ProductNotFound />;
  }
  const productsApi = new ProductsAPI();
  const product = productsApi.getProductsById(productId)[0];
  if (product === undefined) {
    return <ProductNotFound />;
  }

  return (
    <main>
      <Product product={product} />
    </main>
  );
};

export default ProductRoute;
