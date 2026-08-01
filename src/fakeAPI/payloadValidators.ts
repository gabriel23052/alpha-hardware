import { config } from "./config";
import { primitiveValidators } from "./primitiveValidators";
import type { ResponseBuilder } from "./ResponseBuilder";
import type {
  ProductFilter,
  ProductIdQuery,
  ProductQuery,
} from "./services/ProductsService";
import type {
  FavoriteGetPayload,
  FavoriteInsertPayload,
  FavoriteRemovePayload,
} from "./services/FavoritesService";
import type {
  AuthLoginPayload,
  AuthRecoverPayload,
  AuthRegisterPayload,
  AuthUpdatePasswordPayload,
} from "./services/AuthService";

const payloadValidators = {
  productIdQuery(
    response: ResponseBuilder,
    body: FARequestBody,
  ): body is ProductIdQuery {
    if (!("id" in body)) {
      response.setError("PRODUCT_ID_QUERY_ID_FIELD_NOT_FOUND");
      return false;
    }
    if (!primitiveValidators.productId(body.id)) {
      response.setError("PRODUCT_ID_QUERY_INVALID_ID");
      return false;
    }
    return true;
  },

  productQuery(
    response: ResponseBuilder,
    body: FARequestBody,
  ): body is ProductQuery {
    if (!("filter" in body)) {
      response.setError("PRODUCT_QUERY_FILTER_FIELD_NOT_FOUND");
      return false;
    }
    if (!("pattern" in body)) {
      response.setError("PRODUCT_QUERY_PATTERN_FIELD_NOT_FOUND");
      return false;
    }

    if (!this.productQueryFilter(response, body.filter)) {
      return false;
    }
    if (!primitiveValidators.productPattern(body.pattern)) {
      response.setError("PRODUCT_QUERY_INVALID_PATTERN");
      return false;
    }

    if ("sort" in body && !primitiveValidators.productSort(body.sort)) {
      response.setError("PRODUCT_QUERY_INVALID_SORT");
      return false;
    }

    return true;
  },

  productQueryFilter(
    response: ResponseBuilder,
    body: FARequestBodyData,
  ): body is ProductFilter {
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      response.setError("PRODUCT_QUERY_INVALID_FILTER");
      return false;
    }

    if (Object.keys(body).length === 0) {
      response.setError("PRODUCT_QUERY_EMPTY_FILTER");
      return false;
    }

    if (
      "search" in body &&
      !primitiveValidators.productFilterSearch(body.search)
    ) {
      response.setError("PRODUCT_QUERY_INVALID_SEARCH");
      return false;
    }

    if ("saleId" in body && !primitiveValidators.saleId(body.saleId)) {
      response.setError("PRODUCT_QUERY_INVALID_SALE_ID");
      return false;
    }

    if (
      "category" in body &&
      !primitiveValidators.productFilterCategory(body.category)
    ) {
      response.setError("PRODUCT_QUERY_INVALID_CATEGORY");
      return false;
    }

    if (
      "minPrice" in body &&
      !primitiveValidators.productFilterPrice(body.minPrice)
    ) {
      response.setError("PRODUCT_QUERY_INVALID_MIN_PRICE");
      return false;
    }

    if (
      "maxPrice" in body &&
      !primitiveValidators.productFilterPrice(body.maxPrice)
    ) {
      response.setError("PRODUCT_QUERY_INVALID_MAX_PRICE");
      return false;
    }

    if ("tags" in body) {
      const maxTagArrayLength =
        config.validatorsRules.productQueryMaxTagArraySize;
      if (!Array.isArray(body.tags) || body.tags.length > maxTagArrayLength) {
        response.setError("PRODUCT_QUERY_INVALID_TAGS");
        return false;
      }
      for (const tag of body.tags) {
        if (!primitiveValidators.productFilterTag(tag)) {
          response.setError("PRODUCT_QUERY_INVALID_TAGS");
          return false;
        }
      }
    }
    return true;
  },

  authRegister(
    response: ResponseBuilder,
    body: FARequestBody,
  ): body is AuthRegisterPayload {
    if (!("username" in body)) {
      response.setError("AUTH_REGISTER_USERNAME_FIELD_NOT_FOUND");
      return false;
    }
    if (!("password" in body)) {
      response.setError("AUTH_REGISTER_PASSWORD_FIELD_NOT_FOUND");
      return false;
    }

    if (!primitiveValidators.username(body.username)) {
      response.setError("AUTH_REGISTER_INVALID_USERNAME");
      return false;
    }
    if (!primitiveValidators.password(body.password)) {
      response.setError("AUTH_REGISTER_INVALID_PASSWORD");
      return false;
    }

    return true;
  },

  authLogin(
    response: ResponseBuilder,
    body: FARequestBody,
  ): body is AuthLoginPayload {
    if (!("username" in body)) {
      response.setError("AUTH_LOGIN_USERNAME_FIELD_NOT_FOUND");
      return false;
    }
    if (!("password" in body)) {
      response.setError("AUTH_LOGIN_PASSWORD_FIELD_NOT_FOUND");
      return false;
    }

    if (!primitiveValidators.username(body.username)) {
      response.setError("AUTH_LOGIN_INVALID_USERNAME");
      return false;
    }
    if (!primitiveValidators.password(body.password)) {
      response.setError("AUTH_LOGIN_INVALID_PASSWORD");
      return false;
    }

    return true;
  },

  authRecover(
    response: ResponseBuilder,
    body: FARequestBody,
  ): body is AuthRecoverPayload {
    if (!("username" in body)) {
      response.setError("AUTH_RECOVER_USERNAME_FIELD_NOT_FOUND");
      return false;
    }
    if (!("newPassword" in body)) {
      response.setError("AUTH_RECOVER_NEW_PASSWORD_FIELD_NOT_FOUND");
      return false;
    }

    if (!primitiveValidators.username(body.username)) {
      response.setError("AUTH_RECOVER_INVALID_USERNAME");
      return false;
    }
    if (!primitiveValidators.password(body.newPassword)) {
      response.setError("AUTH_RECOVER_INVALID_NEW_PASSWORD");
      return false;
    }

    return true;
  },

  authUpdatePassword(
    response: ResponseBuilder,
    body: FARequestBody,
  ): body is AuthUpdatePasswordPayload {
    if (!("password" in body)) {
      response.setError("AUTH_UPDATE_PASSWORD_PASSWORD_FIELD_NOT_FOUND");
      return false;
    }
    if (!("newPassword" in body)) {
      response.setError(
        "AUTH_UPDATE_PASSWORD_NEW_PASSWORD_FIELD_NOT_FOUND",
      );
      return false;
    }

    if (!primitiveValidators.password(body.password)) {
      response.setError("AUTH_UPDATE_PASSWORD_INVALID_PASSWORD");
      return false;
    }
    if (!primitiveValidators.password(body.newPassword)) {
      response.setError("AUTH_UPDATE_PASSWORD_INVALID_NEW_PASSWORD");
      return false;
    }

    return true;
  },

  favoriteAdd(
    response: ResponseBuilder,
    body: FARequestBody,
  ): body is FavoriteInsertPayload {
    if (!("productId" in body)) {
      response.setError("FAVORITE_ADD_PRODUCT_ID_FIELD_NOT_FOUND");
      return false;
    }

    if (!primitiveValidators.productId(body.productId)) {
      response.setError("FAVORITE_ADD_INVALID_PRODUCT_ID");
      return false;
    }

    return true;
  },

  favoriteRemove(
    response: ResponseBuilder,
    body: FARequestBody,
  ): body is FavoriteRemovePayload {
    if (!("productId" in body)) {
      response.setError("FAVORITE_REMOVE_PRODUCT_ID_FIELD_NOT_FOUND");
      return false;
    }

    if (!primitiveValidators.productId(body.productId)) {
      response.setError("FAVORITE_REMOVE_INVALID_PRODUCT_ID");
      return false;
    }

    return true;
  },

  favoriteGet(
    response: ResponseBuilder,
    payload: FARequestBody,
  ): payload is FavoriteGetPayload {
    if (!("pattern" in payload)) {
      response.setError("FAVORITE_GET_PATTERN_FIELD_NOT_FOUND");
      return false;
    }

    if (!primitiveValidators.favoritePattern(payload.pattern)) {
      response.setError("FAVORITE_GET_INVALID_PATTERN");
      return false;
    }

    return true;
  },
} as const;

export { payloadValidators };
