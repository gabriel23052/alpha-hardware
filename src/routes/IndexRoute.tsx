import { useEffect } from "react";

import LoadingBox from "@components/LoadingBox";
import ErrorMessage from "@components/ErrorMessage";
import ResponsiveBanner from "@components/ResponsiveBanner";
import ProductSale from "@components/product/ProductSale";
import ProductSelection from "@components/product/ProductSelection";
import Categories from "@components/Categories";
import RecentlyViewed from "@components/RecentlyViewed";
import Social from "@components/Social";

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

const IndexRoute = () => {
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
        <ResponsiveBanner bannerData={data.banners.first} />
        <ProductSale productSelection={data.productGroups.sale} />
        <Categories />
        <ProductSelection productSelection={data.productGroups.first} />
        <ResponsiveBanner bannerData={data.banners.second} />
        <Social />
        <ProductSelection productSelection={data.productGroups.second} />
        <RecentlyViewed />
      </main>
    );
  }
};

export default IndexRoute;
