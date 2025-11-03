import type { JafhError, JafhValidation } from "@hooks/useJafh";

export default class Validation {
  private static createError = (
    message: string,
    userFriendly: boolean = true
  ): JafhError => {
    return { message, userFriendly };
  };

  public static priceFilter: JafhValidation = (value) => {
    if (typeof value !== "string") {
      return this.createError(`"priceFilter" deve ser uma string`, false);
    }
    return value.length === 0 || /^\d{1,5}(,\d{1,2})?$/.test(value)
      ? null
      : this.createError(`Preço inválido`);
  };
}
