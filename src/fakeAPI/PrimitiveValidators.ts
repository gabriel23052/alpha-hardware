import { config } from "./config";
import type { Favorite } from "./queries/FavoritesQuery";
import type { ProductSort } from "./services/ProductsService";
import type { Product } from "./tables/ProductsTable";

class PrimitiveValidators {
  private static stringLength(target: string, min: number, max: number) {
    return target.length >= min && target.length <= max;
  }

  private static integerBetween(target: number, min: number, max: number) {
    return Number.isInteger(target) && target >= min && target <= max;
  }

  private static isTrimmed(str: string) {
    return str === str.trim();
  }

  public static productId(id: unknown): id is string {
    if (typeof id !== "string") return false;
    return /^PRO-[0-9A-F]{9}$/.test(id);
  }

  public static saleId(id: unknown): id is string {
    if (typeof id !== "string") return false;
    return /^SAL-[0-9A-F]{6}$/.test(id);
  }

  public static productFilterSearch(search: unknown): search is string {
    if (typeof search !== "string" || !this.isTrimmed(search)) return false;
    const maxLength = config.validatorsRules.productQuerySearchMaxLength;
    const minLength = config.validatorsRules.productQuerySearchMinLength;
    return this.stringLength(search, minLength, maxLength);
  }

  public static productFilterCategory(category: unknown): category is string {
    if (typeof category !== "string" || !this.isTrimmed(category)) return false;
    const maxLength = config.validatorsRules.productQueryCategoryMaxLength;
    const minLength = config.validatorsRules.productQueryCategoryMinLength;
    return this.stringLength(category, minLength, maxLength);
  }

  public static productFilterPrice(price: unknown): price is number {
    if (typeof price !== "number") return false;
    const maxValue = config.validatorsRules.productQueryMaxPrice;
    const minValue = config.validatorsRules.productQueryMinPrice;
    return this.integerBetween(price, minValue, maxValue);
  }

  public static productFilterTag(tag: unknown): tag is string {
    if (typeof tag !== "string" || !this.isTrimmed(tag)) return false;
    const maxLength = config.validatorsRules.productQueryTagMaxLength;
    const minLength = config.validatorsRules.productQueryTagMinLength;
    return this.stringLength(tag, minLength, maxLength);
  }

  public static productPattern(pattern: unknown): pattern is keyof Product {
    return (
      pattern === "default" ||
      pattern === "relatedNeeds" ||
      pattern === "suggestion" ||
      pattern === "card"
    );
  }

  public static productSort(sort: unknown): sort is ProductSort {
    return (
      sort === "increasingPrice" ||
      sort === "decreasingPrice" ||
      sort === "alphabetical"
    );
  }

  public static username(username: unknown): username is string {
    if (typeof username !== "string" || !this.isTrimmed(username)) return false;
    return (
      this.stringLength(
        username,
        config.validatorsRules.usernameMinLength,
        config.validatorsRules.usernameMaxLength,
      ) && /^[a-zA-Z0-9\s]+$/.test(username)
    );
  }

  public static password(password: unknown): password is string {
    if (typeof password !== "string") return false;
    return /^\d{4}$/.test(password);
  }

  public static favoritePattern(pattern: unknown): pattern is keyof Favorite {
    return (
      pattern === "default" ||
      pattern === "productId" ||
      pattern === "resolvedProduct"
    );
  }
}

export { PrimitiveValidators };
