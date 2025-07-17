import ResponsiveBanner from "@components/ResponsiveBanner";
import ProductSale from "@components/product/ProductSale";
import ProductSelection from "@components/product/ProductSelection";
import Categories from "@components/Categories";
import RecentlyViewed from "@components/RecentlyViewed";
import Social from "@components/Social";

import homepageData from "@data/homepageData";

const Index = () => {
  return (
    <main>
      <ResponsiveBanner bannerData={homepageData.banners.gpusSale} />
      <ProductSale saleSelection={homepageData.saleSelection.gpusSale} />
      <Categories />
      <ProductSelection
        productSelection={homepageData.productsSelection.newProducts}
      />
      <ResponsiveBanner bannerData={homepageData.banners.cbxAd} />
      <Social />
      <ProductSelection productSelection={homepageData.productsSelection.noMoreFreezes} />
      <RecentlyViewed products={homepageData.recentlyViewed} />
    </main>
  );
};

export default Index;
