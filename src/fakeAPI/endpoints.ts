import ProductsAPI from "./ProductsAPI";
import validations from "./validations";

export default {
  "GET /api/products": (
    params: Record<string, unknown>
  ): IFakeApiResponse<IProduct[]> => {
    if (
      params === undefined ||
      params.ids === undefined ||
      !validations.productIds(params.ids)
    ) {
      return { code: 400, data: null, error: "Parâmetro(s) incorreto(s)" };
    }
    const { ids } = params;
    const productsApi = new ProductsAPI();
    const products = productsApi.getProductsById(ids);
    if (products.length === 0) {
      return { code: 404, data: null, error: "Produtos não encontrados" };
    }
    return { code: 200, data: productsApi.getProductsById(ids), error: null };
  },
};
