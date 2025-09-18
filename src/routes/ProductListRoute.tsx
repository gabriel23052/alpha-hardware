import ProductFilter from "@components/product/ProductFilter";
// import ProductList from "@components/product/ProductList"

import classes from "./ProductListRoute.module.css";

const ProductListRoute = () => {
  return (
    <main className={`defaultContainer ${classes.productListRoute}`}>
      <div className={`bg-dneutral ${classes.decoration}`}></div>
      <ProductFilter />
      <section>
        <div></div>
        {/* <ProductList /> */}
      </section>
    </main>
  );
};

export default ProductListRoute;
