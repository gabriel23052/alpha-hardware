import homepage from "../data/homepage";
import ProductsHandler from "./ProductsHandler";

export default class PageContentHandler {
  public getHomePageContent() {
    const productsHandler = new ProductsHandler();
    const { banners, productIdGroups } = homepage;

    type ProductGroups = {
      [key: string]: IProductGroup;
    };

    const productGroups = Object.entries(productIdGroups).reduce<ProductGroups>(
      (acc, current) => {
        acc[current[0]] = {
          meta: current[1].meta,
          products: productsHandler.select({
            id: current[1].productIds,
          }).products,
        };
        return acc;
      },
      {}
    );

    return {
      banners,
      productGroups,
    };
  }

  public getProductPageContent(productId: string) {
    const productsHandler = new ProductsHandler();
    return {
      product: productsHandler.select({ id: productId }),
      relatedProducts: productsHandler.selectRelated(productId),
    };
  }
}
