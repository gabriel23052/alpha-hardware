import type { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";

import { ProductsQuery } from "@fakeAPI/queries/ProductsQuery";
import { SessionsHandler } from "./SessionsHandler";
import { FavoritesQuery } from "@fakeAPI/queries/FavoritesQuery";

class FavoritesHandler {
  public addFavorite(response: FakeAPIResponse, productId: string) {
    const sessionsHandler = new SessionsHandler();
    const productQuery = new ProductsQuery();
    const favoritesTable = new FavoritesQuery();

    const sessionData = sessionsHandler.getSessionData(response);
    if (!sessionData) return;

    const product = productQuery.selectById(productId).getUnique("default");
    if (!product) {
      return response.setError("FAVORITE_ADD_PRODUCT_NOT_FOUND");
    }

    favoritesTable.createAndInsert(sessionData.userId, product.id);
  }

  public removeFavorite(response: FakeAPIResponse, productId: string) {
    const sessionsHandler = new SessionsHandler();
    const productQuery = new ProductsQuery();
    const favoritesQuery = new FavoritesQuery();

    const sessionData = sessionsHandler.getSessionData(response);
    if (!sessionData) return;

    const product = productQuery.selectById(productId).getUnique("default");
    if (!product) {
      return response.setError("FAVORITE_REMOVE_PRODUCT_ID_NOT_FOUND");
    }

    favoritesQuery.delete(product.id, sessionData.userId);
  }

  public getFromUser(
    response: FakeAPIResponse<FAProduct_Card[] | string[]>,
    format: FAFavoriteFormats,
  ) {
    const sessionsHandler = new SessionsHandler();
    const favoritesQuery = new FavoritesQuery();

    const sessionData = sessionsHandler.getSessionData(response);
    if (!sessionData) return;

    const data =
      format === "onlyIds"
        ? favoritesQuery.selectByUserId(sessionData.userId).get("productId")
        : favoritesQuery
            .selectByUserId(sessionData.userId)
            .get("resolvedProduct");

    return response.setData(data);
  }
}

export { FavoritesHandler };
