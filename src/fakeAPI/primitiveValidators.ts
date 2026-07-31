import { config } from "./config";
import type { Favorite } from "./queries/FavoritesQuery";
import type { ProductSort } from "./services/ProductsService";
import type { Product } from "./tables/ProductsTable";

function stringLength(target: string, min: number, max: number) {
  return target.length >= min && target.length <= max;
}

function integerBetween(target: number, min: number, max: number) {
  return Number.isInteger(target) && target >= min && target <= max;
}

function isTrimmed(str: string) {
  return str === str.trim();
}

const primitiveValidators = {
  productId(id: unknown): id is string {
    if (typeof id !== "string") return false;
    return /^PRO-[0-9A-F]{9}$/.test(id);
  },

  saleId(id: unknown): id is string {
    if (typeof id !== "string") return false;
    return /^SAL-[0-9A-F]{6}$/.test(id);
  },

  productFilterSearch(search: unknown): search is string {
    if (typeof search !== "string" || !isTrimmed(search)) return false;
    const maxLength = config.validatorsRules.productQuerySearchMaxLength;
    const minLength = config.validatorsRules.productQuerySearchMinLength;
    return stringLength(search, minLength, maxLength);
  },

  productFilterCategory(category: unknown): category is string {
    if (typeof category !== "string" || !isTrimmed(category)) return false;
    const maxLength = config.validatorsRules.productQueryCategoryMaxLength;
    const minLength = config.validatorsRules.productQueryCategoryMinLength;
    return stringLength(category, minLength, maxLength);
  },

  productFilterPrice(price: unknown): price is number {
    if (typeof price !== "number") return false;
    const maxValue = config.validatorsRules.productQueryMaxPrice;
    const minValue = config.validatorsRules.productQueryMinPrice;
    return integerBetween(price, minValue, maxValue);
  },

  productFilterTag(tag: unknown): tag is string {
    if (typeof tag !== "string" || !isTrimmed(tag)) return false;
    const maxLength = config.validatorsRules.productQueryTagMaxLength;
    const minLength = config.validatorsRules.productQueryTagMinLength;
    return stringLength(tag, minLength, maxLength);
  },

  productPattern(pattern: unknown): pattern is keyof Product {
    return (
      pattern === "default" ||
      pattern === "relatedNeeds" ||
      pattern === "suggestion" ||
      pattern === "card"
    );
  },

  productSort(sort: unknown): sort is ProductSort {
    return (
      sort === "increasingPrice" ||
      sort === "decreasingPrice" ||
      sort === "alphabetical"
    );
  },

  username(username: unknown): username is string {
    if (typeof username !== "string" || !isTrimmed(username)) return false;
    return (
      stringLength(
        username,
        config.validatorsRules.usernameMinLength,
        config.validatorsRules.usernameMaxLength,
      ) && /^[a-zA-Z0-9\s]+$/.test(username)
    );
  },

  password(password: unknown): password is string {
    if (typeof password !== "string") return false;
    return /^\d{4}$/.test(password);
  },

  favoritePattern(pattern: unknown): pattern is keyof Favorite {
    return (
      pattern === "default" ||
      pattern === "productId" ||
      pattern === "resolvedProduct"
    );
  },
};

export { primitiveValidators };
