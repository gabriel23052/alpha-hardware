import PageContentHandler from "./handlers/PageContentHandler";
import ProductsHandler from "./handlers/ProductsHandler";

import Validations from "./Validations";

const INCORRECT_PARAMS_MESSAGE = "Estrutura de parâmetros incorreta";

function createResponse<T>(data: T): IFakeApiResponse<T> {
  return { data, error: null };
}

function createError(
  userFriendly: boolean,
  message: string
): IFakeApiResponse<null> {
  return { data: null, error: { userFriendly, message } };
}

export default {
  "GET /api/products": (params: object) => {
    if (!Validations.productFilter(params)) {
      return createError(false, INCORRECT_PARAMS_MESSAGE);
    }
    const productHandler = new ProductsHandler();
    return createResponse<IProductGroup>(productHandler.select(params));
  },

  "GET /api/products/suggestions": (params: object) => {
    if (!("search" in params) || typeof params.search !== "string") {
      return createError(false, INCORRECT_PARAMS_MESSAGE);
    }
    const productsHandler = new ProductsHandler();
    return createResponse(productsHandler.selectSuggestions(params.search));
  },

  "GET /api/products/recentlyViewed": () => {
    const productsHandler = new ProductsHandler();
    return createResponse(productsHandler.selectRecentlyViewed());
  },

  "GET /api/pageContent/home": () => {
    const pageHandler = new PageContentHandler();
    return createResponse(pageHandler.getHomePageContent());
  },

  "GET /api/pageContent/product": (params: object) => {
    if (!("productId" in params) || !Validations.productId(params.productId)) {
      return createError(false, INCORRECT_PARAMS_MESSAGE);
    }
    const pageHandler = new PageContentHandler();
    return createResponse(pageHandler.getProductPageContent(params.productId));
  },
};
