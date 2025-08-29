import homepage from "../data/homepage";
import Products from "./ProductsHandler";

export default class ContentHandler {
  public getHomepageContent() {
    const productsApi = new Products();
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
      productSelection: resolvedProductsSelection,
    };
  }
}
