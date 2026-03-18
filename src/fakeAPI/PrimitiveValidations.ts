import { config } from "./config";

class PrimitiveValidations {
  private static stringLength(target: string, min: number, max: number) {
    return target.length >= min && target.length <= max;
  }

  private static integerBetween(target: number, min: number, max: number) {
    return Number.isInteger(target) && target >= min && target <= max;
  }

  public static productId(id: unknown): id is string {
    if (typeof id !== "string") return false;
    return /^PRO-[0-9A-F]{9}$/.test(id);
  }

  public static saleId(id: unknown): id is string {
    if (typeof id !== "string") return false;
    return /^SAL-[0-9A-F]{6}$/.test(id);
  }

  public static productFilterName(name: unknown): name is string {
    if (typeof name !== "string") return false;
    const maxLength = config.validationsRules.productQueryNameMaxLength;
    const minLength = config.validationsRules.productQueryNameMinLength;
    return this.stringLength(name, minLength, maxLength);
  }

  public static productFilterCategory(category: unknown): category is string {
    if (typeof category !== "string") return false;
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
    if (typeof tag !== "string") return false;
    const maxLength = config.validationsRules.productQueryTagMaxLength;
    const minLength = config.validationsRules.productQueryTagMinLength;
    return this.stringLength(tag, minLength, maxLength);
  }

  public static productFormat(format: unknown): format is FAProductFormatOptions {
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
}

export { PrimitiveValidations };
