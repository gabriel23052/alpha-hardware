import homepage from "../data/homepage";
import ProductsHandler from "./ProductsHandler";

export default class PageContentHandler {
  public getHomePageContent() {
    const productsHandler = new ProductsHandler();
    const products: Record<string, IProductSelection> = {};
    Object.keys(homepage.products).forEach((key) => {
      products[key] = {
        title: homepage.products[key as keyof typeof homepage.products].title,
        role: homepage.products[key as keyof typeof homepage.products].role,
        products: productsHandler.getProductsByIdList(
          homepage.products[key as keyof typeof homepage.products].productIds
        ),
      };
    });
    return { banners: homepage.banners, products };
  }

  public getProductPageContent(productId: string) {
    const productsHandler = new ProductsHandler();
    return {
      product: productsHandler.getProductByFilter({ id: productId }),
      relatedProducts: productsHandler.getRelatedProducts(productId),
    };
  }
}
