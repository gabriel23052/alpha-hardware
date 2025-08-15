import UnderlinedTitle from "@components/UnderlinedTitle";
import ProductBuy from "./ProductBuy";
import ProductGallery from "./ProductGallery";
import ProductSpecSheet from "./ProductSpecSheet";
import ProductList from "./ProductList";

import ProductsAPI from "@fakeAPI/ProductsAPI";

import classes from "./Product.module.css";
import endpoints from "@fakeAPI/endpoints";

const Product = ({ product }: { product: IProduct }) => {
  // Temporário
  const productsAPI = new ProductsAPI();
  const relatedProducts = productsAPI.getRelatedProducts(product);

  console.log(endpoints["GET /api/products"]({ids: ["E01929272"]}));

  return (
    <article className={`defaultContainer ${classes.product}`}>
      <div className={`${classes.title}`}>
        <span className="lneutral-xdark text-small">{product.id}</span>
        <h1 className="dneutral text-verylarge">{product.name}</h1>
      </div>
      <div className={`${classes.main}`}>
        <ProductGallery media={product.media} alt={product.name} />
        <ProductBuy product={product} />
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean velit
          nibh, congue sit amet porttitor a, congue ut mi. Morbi quis porta ex.
          Integer purus nisi, ultricies elementum diam ac, lobortis efficitur
          dolor. Mauris feugiat finibus purus, quis porttitor orci commodo sed.
          Vestibulum eget turpis sed sapien imperdiet elementum. Cras vitae
          dolor
        </p>
      </div>
      <ProductSpecSheet />
    </article>
  );
};

export default Product;
