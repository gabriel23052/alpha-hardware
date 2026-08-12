import { useEffect } from "react";
import { useLocation } from "react-router";

import type { TProduct } from "../../app.types";

import ErrorMessage from "@components/ui/ErrorMessage";
import Actions from "./Actions";
import Gallery from "./Gallery";
import Related from "./collection/Related";
import Info from "./Info";
import Skeleton from "./Skeleton";

import useFakeAPI from "@hooks/useFakeAPI";
import usePageTitle from "@hooks/usePageTitle";
import { recentlyViewed } from "@features/recentlyViewed";

import classes from "./Product.module.css";

const Product = ({ productId }: { productId: string }) => {
  const productRequest = useFakeAPI<TProduct["default"]>("GET api/products/id");
  const relatedProductsRequest = useFakeAPI<TProduct["card"][]>(
    "GET api/products/related",
  );

  usePageTitle(
    "Alpha Hardware" +
      (productRequest.data ? ` | ${productRequest.data.name}` : ""),
  );

  const location = useLocation();

  useEffect(() => {
    const asyncFetch = async () => {
      const response = await productRequest.fetch({ id: productId.trim() });
      relatedProductsRequest.fetch({ id: productId.trim() });
      if (!response.success || !response.data) return;
      recentlyViewed.addProduct(response.data);
    };
    asyncFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (productRequest.loading) {
    return <Skeleton />;
  }

  if (productRequest.error) {
    return (
      <ErrorMessage blockMarginRem={10}>
        {productRequest.error.message}
      </ErrorMessage>
    );
  }

  return productRequest.data === null ? (
    <ErrorMessage blockMarginRem={10}>Produto não encontrado</ErrorMessage>
  ) : (
    <article className={`defaultContainer ${classes.container}`}>
      <div className={classes.title}>
        <p className="text-small lneutral-xdark">{productRequest.data.id}</p>
        <h1 className="text-verylarge dneutral ">{productRequest.data.name}</h1>
      </div>
      <div className={classes.main}>
        <Gallery
          media={productRequest.data.media}
          alt={productRequest.data.name}
        />
        <Actions product={productRequest.data} />
      </div>
      <Related
        data={relatedProductsRequest.data}
        loading={relatedProductsRequest.loading}
        error={relatedProductsRequest.error}
      />
      <Info
        description={productRequest.data.description}
        specs={productRequest.data.specs}
      />
    </article>
  );
};

export default Product;
