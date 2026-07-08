import type { JafhError, JafhValidation } from "@hooks/useJafh";

export default class FieldValidations {
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

  public static username: JafhValidation = (value) => {
    if (typeof value !== "string") {
      return this.createError(`"username" deve ser uma string`, false);
    }
    if (value.length === 0) {
      return this.createError("Campo obrigatório");
    }
    if (value.length < 3 || value.length > 30) {
      return this.createError("Deve ter entre 3 e 30 caracteres");
    }
    return /^[a-zA-Z0-9\s]+$/.test(value)
      ? null
      : this.createError("Somente letras não acentuadas, números e espaços");
  };

  public static password: JafhValidation = (value) => {
    if (typeof value !== "string") {
      return this.createError(`"password" deve ser uma string`, false);
    }
    if (value.length === 0) {
      return this.createError("Campo obrigatório");
    }
    if (value.length !== 4) {
      return this.createError("Deve ter 4 caracteres");
    }
    if (!/^\d+$/.test(value)) {
      return this.createError("Deve conter apenas números");
    }
    return null;
  };
}
