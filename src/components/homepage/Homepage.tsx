import { useEffect } from "react";

import Banner from "./Banner";
import Categories from "./Categories";
import Social from "./Social";
import Sale from "@components/product/collection/Sale";
import Collection from "@components/product/collection/Collection";
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

const Homepage = () => {
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
      <Banner
        data={bannersRequest.data?.sale}
        loading={bannersRequest.loading}
        error={bannersRequest.error}
      />
      <Sale
        data={saleRequest.data}
        loading={saleRequest.loading}
        error={saleRequest.error}
      />
      <Categories />
      <Collection
        data={collectionsRequest.data?.first}
        loading={collectionsRequest.loading}
        error={collectionsRequest.error}
      />
      <Banner
        data={bannersRequest.data?.ad}
        loading={bannersRequest.loading}
        error={bannersRequest.error}
      />
      <Social />
      <Collection
        data={collectionsRequest.data?.second}
        loading={collectionsRequest.loading}
        error={collectionsRequest.error}
      />
      <RecentlyViewed />
    </main>
  );
};

export default Homepage;
