import { useEffect } from "react";

import HomeBanner from "./HomeBanner";
import HomeCategories from "./HomeCategories";
import HomeSocial from "./HomeSocial";
import ProductSale from "@components/product/ProductSale";

import usePageTitle from "@hooks/usePageTitle";
import useFakeAPI from "@hooks/useFakeAPI";

type HomeBanners = {
  sale: IBanner;
  ad: IBanner;
};

const Home = () => {
  usePageTitle("Alpha Hardware");

  const bannersRequest = useFakeAPI<HomeBanners>("GET api/homepage/banners");
  const saleRequest = useFakeAPI<ISale>("GET api/homepage/sale");

  useEffect(() => {
    bannersRequest.fetch();
    saleRequest.fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <HomeBanner
        data={bannersRequest.data?.sale}
        loading={bannersRequest.loading}
        error={bannersRequest.error}
      />
      <ProductSale
        data={saleRequest.data}
        loading={saleRequest.loading}
        error={saleRequest.error}
      />
      <HomeCategories />
      {/*<ProductSelection productSelection={data.productGroups.first} />*/}
      <HomeBanner
        data={bannersRequest.data?.ad}
        loading={bannersRequest.loading}
        error={bannersRequest.error}
      />
      <HomeSocial />
      {/*<ProductSelection productSelection={data.productGroups.second} />
      <RecentlyViewed />  */}
    </main>
  );
};

export default Home;
