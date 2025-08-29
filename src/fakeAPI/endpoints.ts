import ContentAPI from "./ContentAPI";
import ProductsAPI from "./ProductsAPI";
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
    const productsApi = new ProductsAPI();
    const product = productsApi.getProductsById(id)[0];
    if (!product) {
      return error("Produtos não encontrados");
    }
    if (withRelatedProducts) {
      const relatedProducts = productsApi.getRelatedProducts(product);
      return response({ product, relatedProducts });
    }
    return response({ product });
  },
  "GET /api/products/recentlyViewed":
    (): IFakeApiResponse<IProductSelection> => {
      // Temporário
      const productsApi = new ProductsAPI();
      return response(productsApi.getRecentlyViewedProducts());
    },
  "GET /api/homepage": () => {
    const contentApi = new ContentAPI();
    return response(contentApi.getHomepageContent());
  },
};
