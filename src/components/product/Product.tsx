import classes from "./Product.module.css";

import UnderlinedTitle from "@components/UnderlinedTitle";
import ProductBuy from "./ProductBuy";
import ProductGallery from "./ProductGallery";
import ProductCard from "./ProductCard";

import ProductsAPI from "../../fakeAPI/ProductsAPI";

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
    </article>
  );
};

export default Product;
