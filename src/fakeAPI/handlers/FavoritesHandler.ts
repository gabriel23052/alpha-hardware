import type { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";

import { ProductsQuery } from "@fakeAPI/queries/ProductsQuery";
import { SessionsHandler } from "./SessionsHandler";
import { FavoritesTable } from "@fakeAPI/queries/FavoritesTable";

class FavoritesHandler {
  public addFavorite(response: FakeAPIResponse, productId: string) {
    const sessionsHandler = new SessionsHandler();
    const productQuery = new ProductsQuery();
    const favoritesTable = new FavoritesTable();

    const sessionData = sessionsHandler.getSessionData(response);
    if (!sessionData) return;

    const product = productQuery.selectById(productId).getUnique("default");
    if (!product) {
      return response.setError("FAVORITE_ADD_PRODUCT_NOT_FOUND");
    }

    favoritesTable.addFavorite({
      productId: product.id,
      userId: sessionData.userId,
    });
  }

  public removeFavorite(response: FakeAPIResponse, productId: string) {
    const sessionsHandler = new SessionsHandler();
    const productQuery = new ProductsQuery();
    const favoritesTable = new FavoritesTable();

    const sessionData = sessionsHandler.getSessionData(response);
    if (!sessionData) return;

    const product = productQuery.selectById(productId).getUnique("default");
    if (!product) {
      return response.setError("FAVORITE_REMOVE_PRODUCT_ID_NOT_FOUND");
    }

    favoritesTable.removeFavorite({
      productId: product.id,
      userId: sessionData.userId,
    });
  }

  public getFromUser(
    response: FakeAPIResponse<FAProduct_Card[] | string[]>,
    format: FAFavoriteFormats,
  ) {
    const sessionsHandler = new SessionsHandler();
    const favoritesTable = new FavoritesTable();

    const sessionData = sessionsHandler.getSessionData(response);
    if (!sessionData) return;

    favoritesTable.searchByUserId(sessionData.userId);
    const ids = favoritesTable.get().map((f) => f.productId);

    if (format === "onlyIds") {
      return response.setData(ids);
    }

    const productsQuery = new ProductsQuery();
    return response.setData(productsQuery.selectByIdList(ids).get("card"));
  }
}

export { FavoritesHandler };
