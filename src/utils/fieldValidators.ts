const fieldValidators = {
  username: (value: string) => {
    if (value.length === 0) {
      return "Campo obrigatório";
    }
    if (value.length < 3 || value.length > 30) {
      return "Deve ter entre 3 e 30 caracteres";
    }
    return /^[a-zA-Z0-9\s]+$/.test(value)
      ? undefined
      : "Somente letras não acentuadas, números e espaços";
  },

  password: (value: string) => {
    if (value.length === 0) {
      return "Campo obrigatório";
    }
    if (value.length !== 4) {
      return "Deve ter 4 caracteres";
    }
    if (!/^\d+$/.test(value)) {
      return "Deve conter apenas números";
    }
    return undefined;
  },

  priceFilter: (value: string) => {
    return value.length === 0 || /^\d{1,5}(,\d{1,2})?$/.test(value)
      ? undefined
      : "Valor inválido";
  },
};

export { fieldValidators };
