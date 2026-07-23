import { config } from "./config";

import { PrimitiveValidations } from "./PrimitiveValidations";

import type { FakeAPIResponse } from "./FakeAPIResponse";

class Validations {
  public static productById(
    response: FakeAPIResponse,
    body: FARequestBody,
  ): body is { id: string } {
    if (!("id" in body)) return response.setError("PRODUCT_WITHOUT_ID");
    if (!PrimitiveValidations.productId(body.id))
      return response.setError("PRODUCT_INVALID_ID");
    return true;
  }

  public static productQuery(
    response: FakeAPIResponse,
    body: FARequestBody,
  ): body is FAProductQuery {
    if (!("filter" in body))
      return response.setError("PRODUCT_QUERY_WITHOUT_FILTER");
    if (!this.productQueryFilter(response, body.filter)) return false;

    if (!("format" in body))
      return response.setError("PRODUCT_QUERY_WITHOUT_FORMAT");
    if (!PrimitiveValidations.productFormat(body.format))
      return response.setError("PRODUCT_QUERY_INVALID_FORMAT");

    if ("sort" in body && !PrimitiveValidations.productSort(body.sort)) {
      return response.setError("PRODUCT_QUERY_INVALID_SORT");
    }

    return true;
  }

  private static productQueryFilter(
    response: FakeAPIResponse,
    body: FARequestBodyData,
  ): body is FAProductFilter {
    if (typeof body !== "object" || body === null) {
      return response.setError("PRODUCT_QUERY_WITHOUT_FILTER");
    }

    if (
      "search" in body &&
      !PrimitiveValidations.productFilterSearch(body.search)
    )
      return response.setError("PRODUCT_FILTER_INVALID_SEARCH");

    if ("saleId" in body && !PrimitiveValidations.saleId(body.saleId))
      return response.setError("PRODUCT_FILTER_INVALID_SALE_ID");

    if (
      "category" in body &&
      !PrimitiveValidations.productFilterCategory(body.category)
    )
      return response.setError("PRODUCT_FILTER_INVALID_CATEGORY");

    if (
      "minPrice" in body &&
      !PrimitiveValidations.productFilterPrice(body.minPrice)
    )
      return response.setError("PRODUCT_FILTER_INVALID_MIN_PRICE");

    if (
      "maxPrice" in body &&
      !PrimitiveValidations.productFilterPrice(body.maxPrice)
    )
      return response.setError("PRODUCT_FILTER_INVALID_MAX_PRICE");

    if ("tags" in body) {
      const maxTagArrayLength =
        config.validationsRules.productQueryMaxTagArraySize;
      if (!Array.isArray(body.tags) || body.tags.length > maxTagArrayLength)
        return response.setError("PRODUCT_FILTER_INVALID_TAGS");
      for (const tag of body.tags) {
        if (!PrimitiveValidations.productFilterTag(tag))
          return response.setError("PRODUCT_FILTER_INVALID_TAGS");
      }
    }
    return true;
  }

  public static userCreationPayload(
    response: FakeAPIResponse,
    body: FARequestBody,
  ): body is FAUserCreationPayload {
    if (
      !("username" in body) ||
      !PrimitiveValidations.username(body.username)
    ) {
      return response.setError("AUTH_REGISTER_INVALID_USERNAME");
    }

    if (
      !("password" in body) ||
      !PrimitiveValidations.password(body.password)
    ) {
      return response.setError("AUTH_REGISTER_INVALID_PASSWORD");
    }

    return true;
  }

  public static loginPayload(
    response: FakeAPIResponse,
    body: FARequestBody,
  ): body is FALoginPayload {
    if (
      !("username" in body) ||
      !PrimitiveValidations.username(body.username)
    ) {
      return response.setError("AUTH_LOGIN_INVALID_USERNAME");
    }

    if (
      !("password" in body) ||
      !PrimitiveValidations.password(body.password)
    ) {
      return response.setError("AUTH_LOGIN_INVALID_PASSWORD");
    }

    return true;
  }

  public static recoverPayload(
    response: FakeAPIResponse,
    body: FARequestBody,
  ): body is FARecoverPayload {
    if (
      !("username" in body) ||
      !PrimitiveValidations.username(body.username)
    ) {
      return response.setError("AUTH_RECOVER_INVALID_USERNAME");
    }

    if (
      !("newPassword" in body) ||
      !PrimitiveValidations.password(body.newPassword)
    ) {
      return response.setError("AUTH_RECOVER_INVALID_PASSWORD");
    }

    return true;
  }

  public static updatePasswordPayload(
    response: FakeAPIResponse,
    body: FARequestBody,
  ): body is FAUpdatePasswordPayload {
    if (!("password" in body) || !PrimitiveValidations.password(body.password))
      return response.setError("AUTH_UPDATE_PASSWORD_INVALID_PASSWORD");

    if (
      !("newPassword" in body) ||
      !PrimitiveValidations.password(body.newPassword)
    )
      return response.setError("AUTH_UPDATE_PASSWORD_INVALID_NEW_PASSWORD");

    return true;
  }

  public static favoritePostOrDelete(
    response: FakeAPIResponse,
    payload: FARequestBody,
  ): payload is FAFavoritePostOrDeletePayload {
    if (
      !("productId" in payload) ||
      !PrimitiveValidations.productId(payload.productId)
    ) {
      return response.setError("FAVORITE_ADD_PRODUCT_ID_NOT_FOUND");
    }

    return true;
  }

  public static favoriteGet(
    response: FakeAPIResponse,
    payload: FARequestBody,
  ): payload is FAFavoriteGetPayload {
    if (
      !("format" in payload) ||
      !PrimitiveValidations.favoriteFormat(payload.format)
    ) {
      return response.setError("FAVORITE_GET_FORMAT_NOT_FOUND");
    }

    return true;
  }
}

export { Validations };
