import { useEffect } from "react";

import ResponsiveBanner from "@components/ResponsiveBanner";
import ProductSale from "@components/product/ProductSale";
import ProductSelection from "@components/product/ProductSelection";
import Categories from "@components/Categories";
import RecentlyViewed from "@components/RecentlyViewed";
import Social from "@components/Social";

import usePageTitle from "@hooks/usePageTitle";
import useFakeAPI from "@hooks/useFakeAPI";

const IndexRoute = () => {
  usePageTitle("Alpha Hardware");

  const { data, error, request } =
    useFakeAPI<IResolvedHomepage>("GET /api/homepage");

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Temporário
  if (error) return <p>Erro</p>;

  if (data) {
    return (
      <main>
        <ResponsiveBanner bannerData={data.banners[0]} />
        <ProductSale productSelection={data.productSelection[0]} />
        <Categories />
        <ProductSelection productSelection={data.productSelection[1]} />
        <ResponsiveBanner bannerData={data.banners[1]} />
        <Social />
        <ProductSelection productSelection={data.productSelection[2]} />
        <RecentlyViewed />
      </main>
    );
  }
};

export default IndexRoute;
