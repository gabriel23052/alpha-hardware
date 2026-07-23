import type { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";

import { ProductsTable } from "@fakeAPI/tables/ProductsTable";
import { SessionsHandler } from "./SessionsHandler";
import { FavoritesTable } from "@fakeAPI/tables/FavoritesTable";

class FavoritesHandler {
  public addFavorite(response: FakeAPIResponse, productId: string) {
    const sessionsHandler = new SessionsHandler();
    const productTable = new ProductsTable();
    const favoritesTable = new FavoritesTable();

    const sessionData = sessionsHandler.getSessionData(response);
    if (!sessionData) return;

    productTable.searchById(productId);
    const product = productTable.getInFullFormat()[0];
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
    const productTable = new ProductsTable();
    const favoritesTable = new FavoritesTable();

    const sessionData = sessionsHandler.getSessionData(response);
    if (!sessionData) return;

    productTable.searchById(productId);
    const product = productTable.getInFullFormat()[0];
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

    const productsTable = new ProductsTable();
    productsTable.searchByIdList(ids);

    return response.setData(productsTable.getInCardFormat());
  }
}

export { FavoritesHandler };
