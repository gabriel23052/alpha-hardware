import type { JafhError, JafhValidation } from "@hooks/useJafh";

type FieldValidations = {
  [key: string]: JafhValidation;
};

function createError(message: string, userFriendly: boolean = true): JafhError {
  return { message, userFriendly };
}

const fieldValidations: FieldValidations = {
  priceFilter: (value) => {
    if (typeof value !== "string") {
      return createError(`"priceFilter" deve ser uma string`, false);
    }
    return value.length === 0 || /^\d{1,5}(,\d{1,2})?$/.test(value)
      ? null
      : createError(`Preço inválido`);
  },

  username: (value) => {
    if (typeof value !== "string") {
      return createError(`"username" deve ser uma string`, false);
    }
    if (value.length === 0) {
      return createError("Campo obrigatório");
    }
    if (value.length < 3 || value.length > 30) {
      return createError("Deve ter entre 3 e 30 caracteres");
    }
    return /^[a-zA-Z0-9\s]+$/.test(value)
      ? null
      : createError("Somente letras não acentuadas, números e espaços");
  },

  password: (value) => {
    if (typeof value !== "string") {
      return createError(`"password" deve ser uma string`, false);
    }
    if (value.length === 0) {
      return createError("Campo obrigatório");
    }
    if (value.length !== 4) {
      return createError("Deve ter 4 caracteres");
    }
    if (!/^\d+$/.test(value)) {
      return createError("Deve conter apenas números");
    }
    return null;
  },
} as const;

export default fieldValidations;
