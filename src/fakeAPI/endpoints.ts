import ProductsAPI from "./ProductsAPI";

export default {
  "GET /api/products": (ids: string[]): IFakeApiResponse<IProduct[]> => {
    const productsApi = new ProductsAPI();
    const products = productsApi.getProductsById(ids);
    if (products.length === 0) {
      return { code: 404, data: null, error: "Produtos não encontrados" };
    }
    return { code: 200, data: productsApi.getProductsById(ids), error: null };
  },
};
