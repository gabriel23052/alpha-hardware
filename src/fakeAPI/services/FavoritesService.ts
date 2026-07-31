import type { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";

import { ProductsQuery } from "@fakeAPI/queries/ProductsQuery";
import { AuthService } from "./AuthService";
import { FavoritesQuery, type Favorite } from "@fakeAPI/queries/FavoritesQuery";

export type FavoriteGetPayload = {
  pattern: keyof Favorite;
};

export type FavoriteInsertPayload = {
  productId: string;
};

export type FavoriteRemovePayload = {
  productId: string;
};

export type FavoriteAllPatterns =
  | Favorite["default"]
  | Favorite["resolvedProduct"]
  | Favorite["productId"];

class FavoritesService {
  public addFavorite(response: FakeAPIResponse<null>, productId: string) {
    const authService = new AuthService();
    const productQuery = new ProductsQuery();
    const favoritesTable = new FavoritesQuery();

    const sessionData = authService.getSessionData(response);
    if (!sessionData) return;

    const product = productQuery.selectById(productId).getUnique("default");
    if (!product) {
      return response.setError("FAVORITE_ADD_PRODUCT_NOT_FOUND");
    }

    favoritesTable.createAndInsert(sessionData.userId, product.id);
  }

  public removeFavorite(response: FakeAPIResponse, productId: string) {
    const authService = new AuthService();
    const productQuery = new ProductsQuery();
    const favoritesQuery = new FavoritesQuery();

    const sessionData = authService.getSessionData(response);
    if (!sessionData) return;

    const product = productQuery.selectById(productId).getUnique("default");
    if (!product) {
      return response.setError("FAVORITE_REMOVE_PRODUCT_NOT_FOUND");
    }

    favoritesQuery.delete(sessionData.userId, product.id);
  }

  public getFromUser(
    response: FakeAPIResponse<FavoriteAllPatterns[]>,
    pattern: keyof Favorite,
  ) {
    const authService = new AuthService();
    const favoritesQuery = new FavoritesQuery();

    const sessionData = authService.getSessionData(response);
    if (!sessionData) return;

    const data =
      pattern === "default"
        ? favoritesQuery.selectByUserId(sessionData.userId).get("default")
        : pattern === "productId"
          ? favoritesQuery.selectByUserId(sessionData.userId).get("productId")
          : favoritesQuery
              .selectByUserId(sessionData.userId)
              .get("resolvedProduct");

    return response.setData(data);
  }
}

export { FavoritesService };
