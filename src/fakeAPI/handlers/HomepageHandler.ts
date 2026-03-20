import { config } from "@fakeAPI/config";

import { ErrorMessages } from "@fakeAPI/ErrorMessages";
import { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";

import { BannersTable } from "@fakeAPI/tables/BannersTable";
import { CollectionsTable } from "@fakeAPI/tables/CollectionsTable";
import { SalesTable } from "@fakeAPI/tables/SalesTable";

class HomepageHandler {
  public getHomepageBanners(response: FakeAPIResponse<FAHomepageBanners_Full>) {
    const bannersTable = new BannersTable();
    bannersTable.searchById(config.homepage.saleBannerId);
    if (bannersTable.empty)
      return response.setError(ErrorMessages.HP_SALE_BANNER_NOT_FOUND);
    const saleBanner = bannersTable.getInFullFormat()[0];
    bannersTable.searchById(config.homepage.adBannerId);
    if (bannersTable.empty)
      return response.setError(ErrorMessages.HP_AD_BANNER_NOT_FOUND);
    const adBanner = bannersTable.getInFullFormat()[0];
    response.setData({ sale: saleBanner, ad: adBanner });
  }

  public getHomepageSale(response: FakeAPIResponse<FASale_PrCard>) {
    const salesTable = new SalesTable();
    salesTable.searchById(config.homepage.saleId);
    if (salesTable.empty)
      return response.setError(ErrorMessages.HP_SALE_NOT_FOUND);
    response.setData(salesTable.getInPrCardFormat()[0]);
  }

  public getHomepageCollections(
    response: FakeAPIResponse<FAHomepageCollections_Full>,
  ) {
    const collectionsTable = new CollectionsTable();
    const { firstCollectionId, secondCollectionId } = config.homepage;
    collectionsTable.searchById(firstCollectionId);
    if (collectionsTable.empty)
      return response.setError(ErrorMessages.HP_FIRST_COLLECTION_NOT_FOUND);
    const first = collectionsTable.getInPrCardFormat()[0];
    collectionsTable.searchById(secondCollectionId);
    if (collectionsTable.empty)
      return response.setError(ErrorMessages.HP_FIRST_COLLECTION_NOT_FOUND);
    const second = collectionsTable.getInPrCardFormat()[0];
    response.setData({ first, second });
  }
}

export { HomepageHandler };
