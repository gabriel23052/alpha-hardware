import ResponsiveBanner from "@components/ResponsiveBanner";
import ProductCard from "@components/product/ProductCard";
import Categories from "@components/Categories";
import Social from "@components/Social";

import banners from "@data/banners";
import product from "@data/product";

const Index = () => {
  return (
    <main>
      <ResponsiveBanner bannerData={banners.gpusSale} />
      <div className="defaultContainer">
        <ProductCard product={product} buttons={true} />
      </div>
      <Categories />
      <ResponsiveBanner bannerData={banners.cbxAd} />
      <Social />
    </main>
  );
};

export default Index;
