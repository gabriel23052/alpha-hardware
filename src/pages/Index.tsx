import Categories from "../components/Categories";
import ResponsiveBanner from "../components/ResponsiveBanner";

import banners from "../data/banners";

const Index = () => {
  return (
    <main>
      <ResponsiveBanner bannerData={banners.gpusSale} />
      <Categories />
      <ResponsiveBanner bannerData={banners.cbxAd} />
    </main>
  );
};

export default Index;
