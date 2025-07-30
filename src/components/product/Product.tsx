import classes from "./Product.module.css";

import UnderlinedTitle from "@components/UnderlinedTitle";
import ProductBuy from "./ProductBuy";
import ProductGallery from "./ProductGallery";
import ProductCard from "./ProductCard";

import ProductsAPI from "../../fakeAPI/ProductsAPI";
import ProductSpecSheet from "./ProductSpecSheet";

const Product = ({ product }: { product: IProduct }) => {
  // Temporário
  const productsAPI = new ProductsAPI();
  const relatedProducts = productsAPI.getRelatedProducts(product);

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
        <ul>
          {relatedProducts.map((product) => (
            <li>
              <ProductCard
                key={product.id}
                product={product}
                showSale={false}
                buttons={false}
              />
            </li>
          ))}
        </ul>
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
