import type { RequestBody, RequestBodyData } from "./Main";

class Utils {
  public static createRandomHexId(prefix: string, length: number) {
    const id = Array.from({ length }, () =>
      Math.floor(Math.random() * 16).toString(16),
    )
      .join("")
      .toUpperCase();

    return `${prefix}-${id}`;
  }

  public static normalizeSearchText(value: string): string {
    return value
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .toLocaleLowerCase("pt-BR")
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  public static isRequestBodyData(value: unknown): value is RequestBodyData {
    switch (typeof value) {
      case "string":
      case "number":
      case "boolean":
        return true;

      case "object":
        if (value === null) {
          return true;
        }

        if (Array.isArray(value)) {
          return value.every(Utils.isRequestBodyData);
        }

        return Object.values(value).every(Utils.isRequestBodyData);

      default:
        return false;
    }
  }

  public static isRequestBody(value: unknown): value is RequestBody {
    if (
      typeof value !== "object" ||
      value === null ||
      Array.isArray(value) ||
      Object.keys(value).length === 0
    ) {
      return false;
    }

    return Object.values(value).every(this.isRequestBodyData);
  }
}

export { Utils };
