import { useEffect } from "react";

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

  const { data, error, loading, request } = useFakeAPI<IHomepageApiResponse>(
    "GET /api/pageContent/home"
  );

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Temporário
  if (loading) return <h1 style={{ margin: "400px 0" }}>CARREGANDO</h1>;

  // Temporário
  if (error) return <p>Erro</p>;

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
