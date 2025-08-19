import ProductsAPI from "./ProductsAPI";
import validations from "./validations";

function response<T>(data: T): IFakeApiResponse<T> {
  return { data, error: null };
}

function error<T>(message: string): IFakeApiResponse<T> {
  return { data: null, error: message };
}

export default {
  "GET /api/products": (
    params: Record<string, unknown>
  ): IFakeApiResponse<IProduct[]> => {
    if (
      params === undefined ||
      params.ids === undefined ||
      !validations.productIds(params.ids)
    ) {
      return error("Parâmetro(s) incorreto(s)");
    }
    const { ids } = params;
    const productsApi = new ProductsAPI();
    const products = productsApi.getProductsById(ids);
    if (products.length === 0) {
      return error("Produtos não encontrados");
    }
    return response(productsApi.getProductsById(ids));
  },
};
