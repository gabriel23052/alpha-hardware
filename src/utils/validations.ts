const validations = {
  priceFilter: (value: IJsonValue) => {
    if (typeof value !== "string") {
      console.error(`Erro na validação "priceFilter": Não é string`);
      return "Erro na validação";
    }
    return value.length === 0 || /^\d{1,5}(,\d{1,2})?$/.test(value)
      ? null
      : "Preço(s) Inválido(s)";
  },
};

export default validations;
