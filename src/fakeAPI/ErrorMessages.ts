enum ErrorMessages {
  ROUTE_NOT_FOUND = "A rota requisitada não pode ser encontrada",

  HP_SALE_BANNER_NOT_FOUND = "O banner de promoções não pode ser encontrado",
  HP_AD_BANNER_NOT_FOUND = "O banner de publicidade não pode ser encontrado",
  HP_SALE_NOT_FOUND = "A promoção da homepage não pode ser encontrada",
  HP_FIRST_COLLECTION_NOT_FOUND = "A primeira coleção da homepage não pode ser encontrada",
  HP_SECOND_COLLECTION_NOT_FOUND = "A segunda coleção da homepage não pode ser encontrada",

  PRODUCT_BY_ID_WITHOUT_ID = "Busca sem ID",
  PRODUCT_BY_ID_INVALID_ID = "Id de produto inválido",

  PRODUCT_QUERY_INVALID = "Consulta inválida",
  PRODUCT_QUERY_WITHOUT_FILTER = "Consulta sem filtro",
  PRODUCT_QUERY_WITHOUT_FORMAT = "Consulta sem formato",
  PRODUCT_QUERY_INVALID_FORMAT = "Formato inválido",
  PRODUCT_QUERY_INVALID_SORT = "Ordenamento inválido",

  PRODUCT_FILTER_INVALID_FILTER = "Filtro inválido",
  PRODUCT_FILTER_INVALID_NAME = "Filtro por nome inválido",
  PRODUCT_FILTER_INVALID_SALE_ID = "Filtro por ID de promoção inválido",
  PRODUCT_FILTER_INVALID_CATEGORY = "Filtro por categoria inválido",
  PRODUCT_FILTER_INVALID_MIN_PRICE = "Filtro por valor mínimo inválido",
  PRODUCT_FILTER_INVALID_MAX_PRICE = "Filtro por valor máximo inválido",
  PRODUCT_FILTER_INVALID_TAGS = "Filtro por tags inválido",
}

export { ErrorMessages };
