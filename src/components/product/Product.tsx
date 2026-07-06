import { useEffect } from "react";
import { useLocation } from "react-router";

import ErrorMessage from "@components/ui/ErrorMessage";
import ProductActions from "./ProductActions";
import ProductGallery from "./ProductGallery";
import ProductRelated from "./ProductRelated";
import ProductInfo from "./ProductInfo";
import ProductSkeleton from "./ProductSkeleton";

import useFakeAPI from "@hooks/useFakeAPI";

import classes from "./Product.module.css";

const Product = ({ productId }: { productId: string }) => {
  const productRequest = useFakeAPI<IProduct_Full>("GET api/products/id");
  const relatedProductsRequest = useFakeAPI<IProduct_Card[]>(
    "GET api/products/related",
  );

  const location = useLocation();

  useEffect(() => {
    productRequest.fetch({ id: productId });
    relatedProductsRequest.fetch({ id: productId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (productRequest.loading) {
    return <ProductSkeleton />;
  }

  if (productRequest.error) {
    return <ErrorMessage>{productRequest.error}</ErrorMessage>;
  }

  if (productRequest.data)
    return (
      <article className={`defaultContainer ${classes.container}`}>
        <div className={classes.title}>
          <p className="text-small lneutral-xdark">{productRequest.data.id}</p>
          <h1 className="text-verylarge dneutral ">
            {productRequest.data.name}
          </h1>
        </div>
        <div className={classes.main}>
          <ProductGallery
            media={productRequest.data.media}
            alt={productRequest.data.name}
          />
          <ProductActions product={productRequest.data} />
        </div>
        <ProductRelated
          data={relatedProductsRequest.data}
          loading={relatedProductsRequest.loading}
          error={relatedProductsRequest.error}
        />
        <ProductInfo />
      </article>
    );
};

export default Product;
