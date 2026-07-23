//prettier-ignore
const errorsEntries = [
  ["REQUEST_CANCELLED", "Requisição cancelada"],
  ["ROUTE_NOT_FOUND", "A rota requisitada não pode ser encontrada"],
  ["INVALID_BODY", "Corpo de requisição inválido"],
  ["BODY_NOT_FOUND", "Corpo de requisição não enviado"],
 
  ["HP_SALE_BANNER_NOT_FOUND", "Falha ao carregar o banner"],
  ["HP_AD_BANNER_NOT_FOUND", "Falha ao carregar o banner"],
  ["HP_SALE_NOT_FOUND", "Falha ao carregar a promoção"],
  ["HP_FIRST_COLLECTION_NOT_FOUND", "Falha ao carregar os produtos"],
  ["HP_SECOND_COLLECTION_NOT_FOUND", "Falha ao carregar os produtos"],
  ["PRODUCT_WITHOUT_ID", "Produto não encontrado"],
  ["PRODUCT_INVALID_ID", "Produto não encontrado"],
  ["PRODUCT_QUERY_INVALID", "Falha ao buscar produto"],
  ["PRODUCT_QUERY_WITHOUT_FILTER", "Falha ao buscar produto"],
  ["PRODUCT_QUERY_WITHOUT_FORMAT", "Falha ao buscar produto"],
  ["PRODUCT_QUERY_INVALID_FORMAT", "Falha ao buscar produto"],
  ["PRODUCT_QUERY_INVALID_SORT", "Falha ao buscar produto"],
  ["PRODUCT_FILTER_INVALID_FILTER", "Falha ao buscar produto"],
  ["PRODUCT_FILTER_INVALID_SEARCH", "Falha ao buscar produto"],
  ["PRODUCT_FILTER_INVALID_SALE_ID", "Falha ao buscar produto"],
  ["PRODUCT_FILTER_INVALID_CATEGORY", "Falha ao buscar produto"],
  ["PRODUCT_FILTER_INVALID_MIN_PRICE", "Falha ao buscar produto"],
  ["PRODUCT_FILTER_INVALID_MAX_PRICE", "Falha ao buscar produto"],
  ["PRODUCT_FILTER_INVALID_TAGS", "Falha ao buscar produto"],
  ["AUTH_REGISTER_INVALID_USERNAME", "Falha ao cadastrar usuário"],
  ["AUTH_REGISTER_INVALID_PASSWORD", "Falha ao cadastrar usuário"],
  ["AUTH_REGISTER_USER_ALREADY_REGISTERED", "Esse usuário já está cadastrado"],
  ["AUTH_LOGIN_INVALID_USERNAME", "Falha ao entrar na conta"],
  ["AUTH_LOGIN_INVALID_PASSWORD", "Falha ao entrar na conta"],
  ["AUTH_LOGIN_INCORRECT_CREDENTIALS", "O nome de usuário ou senha estão incorretos"],
  ["AUTH_INVALID_SESSION", "Falha ao validar a sessão"],
  ["AUTH_RECOVER_INVALID_USERNAME", "Falha ao recuperar a senha"],
  ["AUTH_RECOVER_INVALID_PASSWORD", "Falha ao recuperar a senha"],
  ["AUTH_RECOVER_USER_NOT_FOUND", "Usuário não encontrado"],
  ["AUTH_UPDATE_PASSWORD_INVALID_PASSWORD", "Falha ao atualizar a senha"],
  ["AUTH_UPDATE_PASSWORD_INVALID_NEW_PASSWORD", "Falha ao atualizar a senha"],
  ["AUTH_UPDATE_PASSWORD_USER_NOT_FOUND", "Falha ao atualizar a senha"],
  ["AUTH_UPDATE_PASSWORD_INCORRECT_PASSWORD", "Senha incorreta"],
  ["FAVORITE_ADD_PRODUCT_NOT_FOUND", "Produto não encontrado"],
  ["FAVORITE_ADD_PRODUCT_ID_NOT_FOUND", "Falha ao adicionar produto aos favoritos"],
  ["FAVORITE_REMOVE_PRODUCT_ID_NOT_FOUND", "Falha ao remover o produto dos favoritos"],
  ["FAVORITE_GET_FORMAT_NOT_FOUND", "Falha buscar os produtos favoritos"]
] as const;

export type ErrorID = (typeof errorsEntries)[number][0];

const errorsMap = new Map<ErrorID, FAResponseError>(
  errorsEntries.map(([id, message]) => [id, { id, message }]),
);

function getFakeAPIError(id: ErrorID): FAResponseError {
  const error = errorsMap.get(id);
  if (!error) throw new Error(`FakeAPI error not found: ${id}`);
  return error;
}

export { getFakeAPIError };
