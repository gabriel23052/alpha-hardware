import homepage from "../data/homepage";
import ProductsHandler from "./ProductsHandler";

export default class PageContentHandler {
  public getHomePageContent() {
    const productsHandler = new ProductsHandler();
    const { banners, productIdLists } = homepage;

    type ProductLists = {
      [key: string]: { title: string; role: string; products: IProduct[] };
    };

    const productLists = Object.entries(productIdLists).reduce<ProductLists>(
      (acc, current) => {
        acc[current[0]] = {
          title: current[1].title,
          role: current[1].role,
          products: productsHandler.getByIdList(current[1].productIds),
        };
        return acc;
      },
      {}
    );

    return {
      banners,
      productLists,
      recentlyViewed: productsHandler.getRecentlyViewed(),
    };
  }

  public getProductPageContent(productId: string) {
    const productsHandler = new ProductsHandler();
    return {
      product: productsHandler.getByFilter({ id: productId }),
      relatedProducts: productsHandler.getRelated(productId),
    };
  }
}
