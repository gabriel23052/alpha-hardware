import ResponsiveBanner from "@components/ResponsiveBanner";
import ProductSale from "@components/product/ProductSale";
import ProductSelection from "@components/product/ProductSelection";
import Categories from "@components/Categories";
import Social from "@components/Social";

import homepageData from "@data/homepageData";

const Index = () => {
  return (
    <main>
      <ResponsiveBanner bannerData={homepageData.banners.gpusSale} />
      <ProductSale saleSelection={homepageData.saleSelection.gpusSale} />
      <ProductSelection
        productSelection={homepageData.productsSelection.newProducts}
      />
      <Categories />
      <ResponsiveBanner bannerData={homepageData.banners.cbxAd} />
      <Social />
    </main>
  );
};

export default Index;
