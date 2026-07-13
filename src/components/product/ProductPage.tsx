import { useParams } from "react-router";

import Product from "@components/product/Product";
import RecentlyViewed from "@components/recentlyViewed/RecentlyViewed";
import ErrorMessage from "@components/ui/ErrorMessage";

import urlParamsValidations from "@utils/urlParamsValidations";

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();

  return (
    <main>
      {urlParamsValidations.productId(productId || "") ? (
        <Product productId={productId || ""} />
      ) : (
        <ErrorMessage>ID de produto inválido, verifique a URL</ErrorMessage>
      )}
      <RecentlyViewed />
    </main>
  );
};

export default ProductPage;
