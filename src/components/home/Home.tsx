import { useEffect } from "react";

import HomeBanner from "./HomeBanner";
import HomeCategories from "./HomeCategories";
import HomeSocial from "./HomeSocial";
import LoadingBox from "@components/LoadingBox";
import ErrorMessage from "@components/ErrorMessage";
import ProductSale from "@components/product/ProductSale";
import ProductSelection from "@components/product/ProductSelection";
import RecentlyViewed from "@components/RecentlyViewed";

import usePageTitle from "@hooks/usePageTitle";
import useFakeAPI from "@hooks/useFakeAPI";

interface IHomepageApiResponse {
  banners: {
    first: IResponsiveBanner;
    second: IResponsiveBanner;
  };
  productGroups: {
    sale: IProductGroup;
    first: IProductGroup;
    second: IProductGroup;
  };
}

const Home = () => {
  usePageTitle("Alpha Hardware");

  const { data, error, loading, fetch } = useFakeAPI<IHomepageApiResponse>(
    "GET /api/pageContent/home"
  );

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <LoadingBox height="100rem" />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (data) {
    return (
      <main>
        <HomeBanner bannerData={data.banners.first} />
        <ProductSale productSelection={data.productGroups.sale} />
        <HomeCategories />
        <ProductSelection productSelection={data.productGroups.first} />
        <HomeBanner bannerData={data.banners.second} />
        <HomeSocial />
        <ProductSelection productSelection={data.productGroups.second} />
        <RecentlyViewed />
      </main>
    );
  }
};

export default Home;
