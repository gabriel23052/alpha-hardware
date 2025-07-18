import homepage from "./data/homepage";
import ProductsAPI from "./ProductsAPI";

export default class ContentAPI {
  public getHomepageContent() {
    const productsApi = new ProductsAPI();
    const resolvedProductsSelection = homepage.productSelection.map(
      ({ title, role, productIds }) => {
        return {
          title,
          role,
          products: productsApi.getProductsById(productIds),
        };
      }
    );
    return {
      banners: homepage.banners,
      productsSelection: resolvedProductsSelection,
    };
  }
}
