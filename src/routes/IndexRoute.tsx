import ResponsiveBanner from "@components/ResponsiveBanner";
import ProductSale from "@components/product/ProductSale";
import ProductSelection from "@components/product/ProductSelection";
import Categories from "@components/Categories";
import RecentlyViewed from "@components/RecentlyViewed";
import Social from "@components/Social";

import usePageTitle from "@hooks/usePageTitle";

import ContentAPI from "@fakeAPI/ContentAPI";

const contentApi = new ContentAPI();
const homepageContent = contentApi.getHomepageContent();

const IndexRoute = () => {
  usePageTitle("Alpha Hardware");
  return (
    <main>
      <ResponsiveBanner bannerData={homepageContent.banners[0]} />
      <ProductSale productSelection={homepageContent.productsSelection[0]} />
      <Categories />
      <ProductSelection
        productSelection={homepageContent.productsSelection[1]}
      />
      <ResponsiveBanner bannerData={homepageContent.banners[1]} />
      <Social />
      <ProductSelection
        productSelection={homepageContent.productsSelection[2]}
      />
      <RecentlyViewed productSelection={homepageContent.productsSelection[3]} />
    </main>
  );
};

export default IndexRoute;
