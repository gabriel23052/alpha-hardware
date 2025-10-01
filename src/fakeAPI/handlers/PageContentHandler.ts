import homepage from "../data/homepage";
import ProductsHandler from "./ProductsHandler";

export default class PageContentHandler {
  public getHomepageContent() {
    const productsHandler = new ProductsHandler();
    const resolvedProductsSelection = homepage.productSelection.map(
      ({ title, role, productIds }) => {
        return {
          title,
          role,
          products: productsHandler.getProductsById(productIds),
        };
      }
    );
    return {
      banners: homepage.banners,
      productSelection: resolvedProductsSelection,
    };
  }

  public getProductPageContent(productId: string) {
    const productsHandler = new ProductsHandler();
    return {
      product: productsHandler.getProductByFilter({ id: productId }),
      relatedProducts: productsHandler.getRelatedProducts(productId),
    };
  }
}
