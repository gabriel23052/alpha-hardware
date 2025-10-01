import PageContentHandler from "./handlers/PageContentHandler";
import ProductsHandler from "./handlers/ProductsHandler";

import validations from "./validations";

function response<T>(data: T): IFakeApiResponse<T> {
  return { data, error: null };
}

function error(message: string): IFakeApiResponse<null> {
  return { data: null, error: message };
}

export default {
  
  "GET /api/products": (params: object) => {
    if (!validations.productFilter(params)) {
      return error("Parâmetro(s) incorreto(s)");
    }
    const productHandler = new ProductsHandler();
    return response<IProduct[]>(productHandler.getProductByFilter(params));
  },

  "GET /api/products/suggestions": (params: Record<string, unknown>) => {
    if (params.search === undefined || typeof params.search !== "string") {
      return error("Parâmetro(s) incorreto(s)");
    }
    const productsHandler = new ProductsHandler();
    const result = productsHandler.getSuggestions(params.search);
    return response(result);
  },

  "GET /api/products/recentlyViewed": () => {
    // Temporário
    const productsHandler = new ProductsHandler();
    return response(productsHandler.getRecentlyViewedProducts());
  },

  "GET /api/pageContent/home": () => {
    const pageHandler = new PageContentHandler();
    return response(pageHandler.getHomePageContent());
  },

  "GET /api/pageContent/product": (params: object) => {
    if (!("productId" in params) || !validations.productId(params.productId)) {
      return error("Parâmetro(s) incorreto(s)");
    }
    const pageHandler = new PageContentHandler();
    return response(pageHandler.getProductPageContent(params.productId));
  },
};
