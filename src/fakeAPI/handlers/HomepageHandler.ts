import { config } from "@fakeAPI/config";

import { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";

import { BannersQuery } from "@fakeAPI/queries/BannersQuery";
import { CollectionsQuery } from "@fakeAPI/queries/CollectionsQuery";
import { SalesQuery } from "@fakeAPI/queries/SalesQuery";

class HomepageHandler {
  public getHomepageBanners(response: FakeAPIResponse<FAHomepageBanners_Full>) {
    const bannersQuery = new BannersQuery();

    const saleBanner = bannersQuery
      .selectById(config.homepage.saleBannerId)
      .getUnique();
    if (!saleBanner) return response.setError("HP_SALE_BANNER_NOT_FOUND");

    bannersQuery.clear();

    const adBanner = bannersQuery
      .selectById(config.homepage.adBannerId)
      .getUnique();
    if (!adBanner) return response.setError("HP_AD_BANNER_NOT_FOUND");

    response.setData({ sale: saleBanner, ad: adBanner });
  }

  public getHomepageSale(response: FakeAPIResponse<FASale_PrCard>) {
    const salesQuery = new SalesQuery();
    const sale = salesQuery
      .selectById(config.homepage.saleId)
      .getUnique("resolvedProducts");
    if (!sale) return response.setError("HP_SALE_NOT_FOUND");
    response.setData(sale);
  }

  public getHomepageCollections(
    response: FakeAPIResponse<FAHomepageCollections_Full>,
  ) {
    const collectionsQuery = new CollectionsQuery();
    const { firstCollectionId, secondCollectionId } = config.homepage;

    const firstCollection = collectionsQuery
      .selectById(firstCollectionId)
      .getUnique();
    if (!firstCollection) {
      return response.setError("HP_FIRST_COLLECTION_NOT_FOUND");
    }

    collectionsQuery.clear();

    const secondCollection = collectionsQuery
      .selectById(secondCollectionId)
      .getUnique();
    if (!secondCollection) {
      return response.setError("HP_SECOND_COLLECTION_NOT_FOUND");
    }

    response.setData({ first: firstCollection, second: secondCollection });
  }
}

export { HomepageHandler };
