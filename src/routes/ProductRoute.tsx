import { useParams } from "react-router";

import Product from "@components/product/Product";
import ProductsAPI from "../fakeAPI/ProductsAPI";

const ProductRoute = () => {
  const { productId } = useParams<{ productId: string }>();
  if (productId === undefined) {
    return null;
  }

  const productsApi = new ProductsAPI();
  const product = productsApi.getProductsById(productId)[0];
  if (product === undefined) {
    return null;
  }

  return (
    <main>
      <Product product={product} />
    </main>
  );
};

export default ProductRoute;
