import { useEffect } from "react";

import HomeBanner from "./HomeBanner";
import HomeCategories from "./HomeCategories";
import HomeSocial from "./HomeSocial";
import ProductSale from "@components/product/ProductSale";
import ProductCollection from "@components/product/ProductCollection";
import RecentlyViewed from "@components/recentlyViewed/RecentlyViewed";

import usePageTitle from "@hooks/usePageTitle";
import useFakeAPI from "@hooks/useFakeAPI";

type HomeBanners = {
  sale: IBanner;
  ad: IBanner;
};

type HomeCollections = {
  first: IProductCollection;
  second: IProductCollection;
};

const Home = () => {
  usePageTitle("Alpha Hardware");

  const bannersRequest = useFakeAPI<HomeBanners>("GET api/homepage/banners");
  const saleRequest = useFakeAPI<ISale>("GET api/homepage/sale");
  const collectionsRequest = useFakeAPI<HomeCollections>(
    "GET api/homepage/collections",
  );

  useEffect(() => {
    bannersRequest.fetch();
    saleRequest.fetch();
    collectionsRequest.fetch();
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
      <ProductCollection
        data={collectionsRequest.data?.first}
        loading={collectionsRequest.loading}
        error={collectionsRequest.error}
      />
      <HomeBanner
        data={bannersRequest.data?.ad}
        loading={bannersRequest.loading}
        error={bannersRequest.error}
      />
      <HomeSocial />
      <ProductCollection
        data={collectionsRequest.data?.second}
        loading={collectionsRequest.loading}
        error={collectionsRequest.error}
      />
      <RecentlyViewed />
    </main>
  );
};

export default Home;
