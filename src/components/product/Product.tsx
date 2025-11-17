import { useEffect } from "react";
import { useLocation } from "react-router";

import UnderlinedTitle from "@components/UnderlinedTitle";
import ProductBuy from "./ProductBuy";
import ProductGallery from "./ProductGallery";
import ProductSpecSheet from "./ProductSpecSheet";
import ProductList from "./ProductList";

import useFakeAPI from "@hooks/useFakeAPI";

import classes from "./Product.module.css";

const Product = ({ productId }: { productId: string }) => {
  const {
    data: pageContent,
    error,
    loading,
    fetch,
  } = useFakeAPI<{
    product: IProductGroup;
    relatedProducts: IProductGroup;
  }>("GET /api/pageContent/product");

  const product = pageContent ? pageContent.product.products : null;
  const relatedProducts = pageContent
    ? pageContent.relatedProducts.products
    : null;

  const location = useLocation();

  useEffect(() => {
    fetch({ productId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Temporário
  if (loading) return <h1 style={{ margin: "400px 0" }}>CARREGANDO</h1>;

  // Temporário
  if (error) return <p>{error.message}</p>;

  // Temporário
  if (product?.length === 0) return <p>Produto não encontrado</p>;

  if (product && relatedProducts)
    return (
      <article className={`defaultContainer ${classes.product}`}>
        <div className={`${classes.title}`}>
          <span className="lneutral-xdark text-small">{product[0].id}</span>
          <h1 className="dneutral text-verylarge">{product[0].name}</h1>
        </div>
        <div className={`${classes.main}`}>
          <ProductGallery media={product[0].media} alt={product[0].name} />
          <ProductBuy product={product[0]} />
        </div>
        <div className={`${classes.relatedProducts}`}>
          <UnderlinedTitle>Produtos relacionados</UnderlinedTitle>
          <ProductList
            products={relatedProducts}
            hideSale={true}
            hideButtons={true}
          />
        </div>
        <div className={`${classes.description}`}>
          <UnderlinedTitle>Descrição do produto</UnderlinedTitle>
          <p className="dneutral text-default">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            velit nibh, congue sit amet porttitor a, congue ut mi. Morbi quis
            porta ex. Integer purus nisi, ultricies elementum diam ac, lobortis
            efficitur dolor. Mauris feugiat finibus purus, quis porttitor orci
            commodo sed. Vestibulum eget turpis sed sapien imperdiet elementum.
            Cras vitae dolor
          </p>
        </div>
        <ProductSpecSheet />
      </article>
    );
};

export default Product;
