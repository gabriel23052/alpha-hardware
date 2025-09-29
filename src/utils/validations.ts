const validations = {
  priceFilter: (value: IJsonValue) => {
    if (typeof value !== "string") return "O preço precisa ser uma string";
    return value.length === 0 || /^\d{1,5}(,\d{1,2})?$/.test(value)
      ? null
      : "Valor inválido";
  },
};

export default validations;
