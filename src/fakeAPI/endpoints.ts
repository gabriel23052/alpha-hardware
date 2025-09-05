import ContentHandler from "./handlers/ContentHandler";
import ProductsHandler from "./handlers/ProductsHandler";
import validations from "./validations";

function response<T>(data: T): IFakeApiResponse<T> {
  return { data, error: null };
}

function error<T>(message: string): IFakeApiResponse<T> {
  return { data: null, error: message };
}

export default {
  "GET /api/product": (
    params: Record<string, unknown>
  ): IFakeApiResponse<{ product: IProduct; relatedProducts?: IProduct[] }> => {
    if (
      params === undefined ||
      params.id === undefined ||
      params.withRelatedProducts === undefined ||
      typeof params.withRelatedProducts !== "boolean" ||
      !validations.productId(params.id)
    ) {
      return error("Parâmetro(s) incorreto(s)");
    }
    const { id, withRelatedProducts } = params;
    const productsHandler = new ProductsHandler();
    const product = productsHandler.getProductsById(id)[0];
    if (!product) {
      return error("Produtos não encontrados");
    }
    if (withRelatedProducts) {
      const relatedProducts = productsHandler.getRelatedProducts(product);
      return response({ product, relatedProducts });
    }
    return response({ product });
  },
  "GET /api/products/suggestions": (
    params: Record<string, unknown>
  ): IFakeApiResponse<IProductSuggestion[]> => {
    if (params.search === undefined || typeof params.search !== "string") {
      return error("Parâmetro(s) incorreto(s)");
    }
    const productsHandler = new ProductsHandler();
    const result = productsHandler.getSuggestions(params.search);
    return response(result);
  },
  "GET /api/products/recentlyViewed":
    (): IFakeApiResponse<IProductSelection> => {
      // Temporário
      const productsHandler = new ProductsHandler();
      return response(productsHandler.getRecentlyViewedProducts());
    },
  "GET /api/homepage": () => {
    const contentHandler = new ContentHandler();
    return response(contentHandler.getHomepageContent());
  },
};
