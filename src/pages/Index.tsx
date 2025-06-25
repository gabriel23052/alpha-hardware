import ResponsiveBanner from "../components/ResponsiveBanner";

import banners from "../data/banners";

const Index = () => {
  return (
    <main>
      <ResponsiveBanner bannerData={banners.gpusSale} />
    </main>
  );
};

export default Index;
