import { config } from "@fakeAPI/config";

import { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";

import { BannersQuery } from "@fakeAPI/queries/BannersQuery";
import { CollectionsTable } from "@fakeAPI/queries/CollectionsTable";
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
    const collectionsTable = new CollectionsTable();
    const { firstCollectionId, secondCollectionId } = config.homepage;
    collectionsTable.searchById(firstCollectionId);
    if (collectionsTable.empty)
      return response.setError("HP_FIRST_COLLECTION_NOT_FOUND");
    const first = collectionsTable.getInPrCardFormat()[0];
    collectionsTable.searchById(secondCollectionId);
    if (collectionsTable.empty)
      return response.setError("HP_FIRST_COLLECTION_NOT_FOUND");
    const second = collectionsTable.getInPrCardFormat()[0];
    response.setData({ first, second });
  }
}

export { HomepageHandler };
