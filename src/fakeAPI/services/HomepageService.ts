import { config } from "@fakeAPI/config";

import { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";
import { BannersQuery } from "@fakeAPI/queries/BannersQuery";
import { CollectionsQuery } from "@fakeAPI/queries/CollectionsQuery";
import { SalesQuery } from "@fakeAPI/queries/SalesQuery";

import type { Banner } from "@fakeAPI/tables/BannersTable";
import type { Collection } from "@fakeAPI/tables/CollectionsTable";
import type { Sale } from "@fakeAPI/tables/SalesTable";

export type HomepageBanners = {
  sale: Banner["default"];
  ad: Banner["default"];
};

export type HomepageCollections = {
  first: Collection["resolvedProducts"];
  second: Collection["resolvedProducts"];
};

class HomepageService {
  public getBanners(response: FakeAPIResponse<HomepageBanners>) {
    const bannersQuery = new BannersQuery();
    const { saleBannerId, adBannerId } = config.homepage;

    const saleBanner = bannersQuery.selectById(saleBannerId).getUnique();
    if (!saleBanner) return response.setError("HP_SALE_BANNER_NOT_FOUND");

    bannersQuery.clear();

    const adBanner = bannersQuery.selectById(adBannerId).getUnique();
    if (!adBanner) return response.setError("HP_AD_BANNER_NOT_FOUND");

    response.setData({ sale: saleBanner, ad: adBanner });
  }

  public getSale(response: FakeAPIResponse<Sale["resolvedProducts"]>) {
    const salesQuery = new SalesQuery();

    const sale = salesQuery
      .selectById(config.homepage.saleId)
      .getUnique("resolvedProducts");
    if (!sale) return response.setError("HP_SALE_NOT_FOUND");

    response.setData(sale);
  }

  public getCollections(response: FakeAPIResponse<HomepageCollections>) {
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

export { HomepageService };
