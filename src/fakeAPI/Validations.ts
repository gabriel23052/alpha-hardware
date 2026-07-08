import { config } from "./config";

import { ErrorMessages } from "./ErrorMessages";
import { PrimitiveValidations } from "./PrimitiveValidations";

import type { FakeAPIResponse } from "./FakeAPIResponse";

class Validations {
  private static isValidParamRecord(
    requestParam: FARequestParameterData,
  ): requestParam is { [key: string]: FARequestParameterData } {
    return (
      typeof requestParam === "object" &&
      !Array.isArray(requestParam) &&
      Object.keys(requestParam).length !== 0
    );
  }

  public static productById(
    response: FakeAPIResponse,
    params: FARequestParameter,
  ): params is { id: string } {
    if (!("id" in params))
      return response.setError(ErrorMessages.PRODUCT_BY_ID_WITHOUT_ID);
    if (!PrimitiveValidations.productId(params.id))
      return response.setError(ErrorMessages.PRODUCT_BY_ID_INVALID_ID);
    return true;
  }

  public static productQuery(
    response: FakeAPIResponse,
    params: FARequestParameterData,
  ): params is FAProductQuery {
    if (!this.isValidParamRecord(params))
      return response.setError(ErrorMessages.PRODUCT_QUERY_INVALID);

    if (!("filter" in params))
      return response.setError(ErrorMessages.PRODUCT_QUERY_WITHOUT_FILTER);
    if (!this.productQueryFilter(response, params.filter)) return false;

    if (!("format" in params))
      return response.setError(ErrorMessages.PRODUCT_QUERY_WITHOUT_FORMAT);
    if (!PrimitiveValidations.productFormat(params.format))
      return response.setError(ErrorMessages.PRODUCT_QUERY_INVALID_FORMAT);

    if ("sort" in params && !PrimitiveValidations.productSort(params.sort)) {
      return response.setError(ErrorMessages.PRODUCT_QUERY_INVALID_SORT);
    }

    return true;
  }

  private static productQueryFilter(
    response: FakeAPIResponse,
    queryFilter: FARequestParameterData,
  ): queryFilter is FAProductFilter {
    if (!this.isValidParamRecord(queryFilter))
      return response.setError(ErrorMessages.PRODUCT_FILTER_INVALID_FILTER);

    if (
      "name" in queryFilter &&
      !PrimitiveValidations.productFilterName(queryFilter.name)
    )
      return response.setError(ErrorMessages.PRODUCT_FILTER_INVALID_NAME);

    if (
      "saleId" in queryFilter &&
      !PrimitiveValidations.saleId(queryFilter.saleId)
    )
      return response.setError(ErrorMessages.PRODUCT_FILTER_INVALID_SALE_ID);

    if (
      "category" in queryFilter &&
      !PrimitiveValidations.productFilterCategory(queryFilter.category)
    )
      return response.setError(ErrorMessages.PRODUCT_FILTER_INVALID_CATEGORY);

    if (
      "minPrice" in queryFilter &&
      !PrimitiveValidations.productFilterPrice(queryFilter.minPrice)
    )
      return response.setError(ErrorMessages.PRODUCT_FILTER_INVALID_MIN_PRICE);

    if (
      "maxPrice" in queryFilter &&
      !PrimitiveValidations.productFilterPrice(queryFilter.maxPrice)
    )
      return response.setError(ErrorMessages.PRODUCT_FILTER_INVALID_MAX_PRICE);

    if ("tags" in queryFilter) {
      const maxTagArrayLength =
        config.validationsRules.productQueryMaxTagArraySize;
      if (
        !Array.isArray(queryFilter.tags) ||
        queryFilter.tags.length > maxTagArrayLength
      )
        return response.setError(ErrorMessages.PRODUCT_FILTER_INVALID_TAGS);
      for (const tag of queryFilter.tags) {
        if (!PrimitiveValidations.productFilterTag(tag))
          return response.setError(ErrorMessages.PRODUCT_FILTER_INVALID_TAGS);
      }
    }
    return true;
  }

  public static userCreationPayload(
    response: FakeAPIResponse,
    userCreationPayload: FARequestParameterData,
  ): userCreationPayload is FAUserCreationPayload {
    if (!this.isValidParamRecord(userCreationPayload)) {
      return response.setError(ErrorMessages.USER_CREATION_INVALID_PAYLOAD);
    }

    if (
      !("username" in userCreationPayload) ||
      !PrimitiveValidations.username(userCreationPayload.username)
    ) {
      return response.setError(ErrorMessages.USER_CREATION_INVALID_USERNAME);
    }

    if (
      !("password" in userCreationPayload) ||
      !PrimitiveValidations.password(userCreationPayload.password)
    ) {
      return response.setError(ErrorMessages.USER_CREATION_INVALID_PASSWORD);
    }

    return true;
  }
}

export { Validations };
