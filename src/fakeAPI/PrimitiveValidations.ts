import { config } from "./config";

class PrimitiveValidations {
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
    const maxLength = config.validationsRules.productQuerySearchMaxLength;
    const minLength = config.validationsRules.productQuerySearchMinLength;
    return this.stringLength(search, minLength, maxLength);
  }

  public static productFilterCategory(category: unknown): category is string {
    if (typeof category !== "string" || !this.isTrimmed(category)) return false;
    const maxLength = config.validationsRules.productQueryCategoryMaxLength;
    const minLength = config.validationsRules.productQueryCategoryMinLength;
    return this.stringLength(category, minLength, maxLength);
  }

  public static productFilterPrice(price: unknown): price is number {
    if (typeof price !== "number") return false;
    const maxValue = config.validationsRules.productQueryMaxPrice;
    const minValue = config.validationsRules.productQueryMinPrice;
    return this.integerBetween(price, minValue, maxValue);
  }

  public static productFilterTag(tag: unknown): tag is string {
    if (typeof tag !== "string" || !this.isTrimmed(tag)) return false;
    const maxLength = config.validationsRules.productQueryTagMaxLength;
    const minLength = config.validationsRules.productQueryTagMinLength;
    return this.stringLength(tag, minLength, maxLength);
  }

  public static productFormat(
    format: unknown,
  ): format is FAProductFormatOptions {
    return (
      format === "full" ||
      format === "price" ||
      format === "suggestion" ||
      format === "card"
    );
  }

  public static productSort(sort: unknown): sort is FAProductSort {
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
        config.validationsRules.usernameMinLength,
        config.validationsRules.usernameMaxLength,
      ) && /^[a-zA-Z0-9\s]+$/.test(username)
    );
  }

  public static password(password: unknown): password is string {
    if (typeof password !== "string") return false;
    return /^\d{4}$/.test(password);
  }

  public static favoriteFormat(format: unknown): format is string {
    return format === "onlyIds" || format === "products";
  }
}

export { PrimitiveValidations };
