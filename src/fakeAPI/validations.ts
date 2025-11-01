const MAX_PRODUCT_NAME_LENGTH = 200;
const MAX_SALE_NAME_LENGTH = 100;
const MAX_PRODUCT_CATEGORY_NAME_LENGTH = 30;
const MAX_PRODUCT_TAG_LENGTH = 30;
const MAX_PRODUCT_TAG_ARRAY_SIZE = 4;
const MIN_PRICE = 0;
const MAX_PRICE = 9999999;

const validations = {
  productId: (id: unknown): id is string => {
    return typeof id === "string" && /^[a-f\d]{9}$/i.test(id);
  },

  stringWithLimitedLength: (str: unknown, maxLength: number): str is string => {
    return typeof str === "string" && str.length <= maxLength;
  },

  integerWithLimits: (
    number: unknown,
    min: number,
    max: number
  ): number is number => {
    return (
      typeof number === "number" &&
      Number.isInteger(number) &&
      number >= min &&
      number <= max
    );
  },

  productFilter: (filter: object): filter is IFakeApiProductFilter => {
    if ("id" in filter) {
      if (validations.productId(filter.id)) return true;
      return false;
    }

    if (
      "name" in filter &&
      !validations.stringWithLimitedLength(filter.name, MAX_PRODUCT_NAME_LENGTH)
    )
      return false;

    if (
      "sale" in filter &&
      !validations.stringWithLimitedLength(filter.sale, MAX_SALE_NAME_LENGTH)
    )
      return false;

    if (
      "category" in filter &&
      !validations.stringWithLimitedLength(
        filter.category,
        MAX_PRODUCT_CATEGORY_NAME_LENGTH
      )
    )
      return false;

    if (
      "minPrice" in filter &&
      !validations.integerWithLimits(filter.minPrice, MIN_PRICE, MAX_PRICE)
    )
      return false;

    if (
      "maxPrice" in filter &&
      !validations.integerWithLimits(filter.maxPrice, MIN_PRICE, MAX_PRICE)
    )
      return false;

    if ("tags" in filter) {
      if (
        !(filter.tags instanceof Array) ||
        filter.tags.length > MAX_PRODUCT_TAG_ARRAY_SIZE
      )
        return false;
      for (const tag of filter.tags) {
        if (!validations.stringWithLimitedLength(tag, MAX_PRODUCT_TAG_LENGTH))
          return false;
      }
    }

    if ("sortBy" in filter) {
      if (
        filter.sortBy !== "increasingPrice" &&
        filter.sortBy !== "decreasingPrice"
      )
        return false;
    }

    return true;
  },
};

export default validations;
