import { config } from "./config";
import { primitiveValidators } from "./primitiveValidators";
import type { FakeAPIResponse } from "./FakeAPIResponse";

const payloadValidators = {

  productIdQuery(
    response: FakeAPIResponse,
    body: FARequestBody,
  ): body is FAProductIdQuery {
    if (!("id" in body)) {
      return response.setError("PRODUCT_ID_QUERY_ID_FIELD_NOT_FOUND");
    }
    if (!primitiveValidators.productId(body.id)) {
      return response.setError("PRODUCT_ID_QUERY_INVALID_ID");
    }
    return true;
  },

  productQuery(
    response: FakeAPIResponse,
    body: FARequestBody,
  ): body is FAProductQuery {
    if (!("filter" in body)) {
      return response.setError("PRODUCT_QUERY_FILTER_FIELD_NOT_FOUND");
    }
    if (!("format" in body)) {
      return response.setError("PRODUCT_QUERY_FORMAT_FIELD_NOT_FOUND");
    }

    if (!this.productQueryFilter(response, body.filter)) {
      return false;
    }
    if (!primitiveValidators.productFormat(body.format)) {
      return response.setError("PRODUCT_QUERY_INVALID_FORMAT");
    }

    if ("sort" in body && !primitiveValidators.productSort(body.sort)) {
      return response.setError("PRODUCT_QUERY_INVALID_SORT");
    }

    return true;
  },

  productQueryFilter(
    response: FakeAPIResponse,
    body: FARequestBodyData,
  ): body is FAProductFilter {
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return response.setError("PRODUCT_QUERY_INVALID_FILTER");
    }

    if (Object.keys(body).length === 0) {
      return response.setError("PRODUCT_QUERY_EMPTY_FILTER");
    }

    if (
      "search" in body &&
      !primitiveValidators.productFilterSearch(body.search)
    ) {
      return response.setError("PRODUCT_QUERY_INVALID_SEARCH");
    }

    if ("saleId" in body && !primitiveValidators.saleId(body.saleId)) {
      return response.setError("PRODUCT_QUERY_INVALID_SALE_ID");
    }

    if (
      "category" in body &&
      !primitiveValidators.productFilterCategory(body.category)
    ) {
      return response.setError("PRODUCT_QUERY_INVALID_CATEGORY");
    }

    if (
      "minPrice" in body &&
      !primitiveValidators.productFilterPrice(body.minPrice)
    ) {
      return response.setError("PRODUCT_QUERY_INVALID_MIN_PRICE");
    }

    if (
      "maxPrice" in body &&
      !primitiveValidators.productFilterPrice(body.maxPrice)
    ) {
      return response.setError("PRODUCT_QUERY_INVALID_MAX_PRICE");
    }

    if ("tags" in body) {
      const maxTagArrayLength =
        config.validatorsRules.productQueryMaxTagArraySize;
      if (!Array.isArray(body.tags) || body.tags.length > maxTagArrayLength) {
        return response.setError("PRODUCT_QUERY_INVALID_TAGS");
      }
      for (const tag of body.tags) {
        if (!primitiveValidators.productFilterTag(tag)) {
          return response.setError("PRODUCT_QUERY_INVALID_TAGS");
        }
      }
    }
    return true;
  },

  authRegister(
    response: FakeAPIResponse,
    body: FARequestBody,
  ): body is FAAuthRegister {
    if (!("username" in body)) {
      return response.setError("AUTH_REGISTER_USERNAME_FIELD_NOT_FOUND");
    }
    if (!("password" in body)) {
      return response.setError("AUTH_REGISTER_PASSWORD_FIELD_NOT_FOUND");
    }

    if (!primitiveValidators.username(body.username)) {
      return response.setError("AUTH_REGISTER_INVALID_USERNAME");
    }
    if (!primitiveValidators.password(body.password)) {
      return response.setError("AUTH_REGISTER_INVALID_PASSWORD");
    }

    return true;
  },

  authLogin(
    response: FakeAPIResponse,
    body: FARequestBody,
  ): body is FAAuthLogin {
    if (!("username" in body)) {
      return response.setError("AUTH_LOGIN_USERNAME_FIELD_NOT_FOUND");
    }
    if (!("password" in body)) {
      return response.setError("AUTH_LOGIN_PASSWORD_FIELD_NOT_FOUND");
    }

    if (!primitiveValidators.username(body.username)) {
      return response.setError("AUTH_LOGIN_INVALID_USERNAME");
    }
    if (!primitiveValidators.password(body.password)) {
      return response.setError("AUTH_LOGIN_INVALID_PASSWORD");
    }

    return true;
  },

  authRecover(
    response: FakeAPIResponse,
    body: FARequestBody,
  ): body is FAAuthRecover {
    if (!("username" in body)) {
      return response.setError("AUTH_RECOVER_USERNAME_FIELD_NOT_FOUND");
    }
    if (!("newPassword" in body)) {
      return response.setError("AUTH_RECOVER_NEW_PASSWORD_FIELD_NOT_FOUND");
    }

    if (!primitiveValidators.username(body.username)) {
      return response.setError("AUTH_RECOVER_INVALID_USERNAME");
    }
    if (!primitiveValidators.password(body.newPassword)) {
      return response.setError("AUTH_RECOVER_INVALID_NEW_PASSWORD");
    }

    return true;
  },

  authUpdatePassword(
    response: FakeAPIResponse,
    body: FARequestBody,
  ): body is FAAuthUpdatePassword {
    if (!("password" in body)) {
      return response.setError("AUTH_UPDATE_PASSWORD_PASSWORD_FIELD_NOT_FOUND");
    }
    if (!("newPassword" in body)) {
      return response.setError(
        "AUTH_UPDATE_PASSWORD_NEW_PASSWORD_FIELD_NOT_FOUND",
      );
    }

    if (!primitiveValidators.password(body.password)) {
      return response.setError("AUTH_UPDATE_PASSWORD_INVALID_PASSWORD");
    }
    if (!primitiveValidators.password(body.newPassword)) {
      return response.setError("AUTH_UPDATE_PASSWORD_INVALID_NEW_PASSWORD");
    }

    return true;
  },

  favoriteAdd(
    response: FakeAPIResponse,
    body: FARequestBody,
  ): body is FAFavoriteAddOrRemove {
    if (!("productId" in body)) {
      return response.setError("FAVORITE_ADD_PRODUCT_ID_FIELD_NOT_FOUND");
    }

    if (!primitiveValidators.productId(body.productId)) {
      return response.setError("FAVORITE_ADD_INVALID_PRODUCT_ID");
    }

    return true;
  },

  favoriteRemove(
    response: FakeAPIResponse,
    body: FARequestBody,
  ): body is FAFavoriteAddOrRemove {
    if (!("productId" in body)) {
      return response.setError("FAVORITE_REMOVE_PRODUCT_ID_FIELD_NOT_FOUND");
    }

    if (!primitiveValidators.productId(body.productId)) {
      return response.setError("FAVORITE_REMOVE_INVALID_PRODUCT_ID");
    }

    return true;
  },

  favoriteGet(
    response: FakeAPIResponse,
    payload: FARequestBody,
  ): payload is FAFavoriteGet {
    if (!("format" in payload)) {
      return response.setError("FAVORITE_GET_FORMAT_FIELD_NOT_FOUND");
    }

    if (!primitiveValidators.favoriteFormat(payload.format)) {
      return response.setError("FAVORITE_GET_INVALID_FORMAT");
    }

    return true;
  },

} as const;

export { payloadValidators };
