import exclusionFilter from "@utils/exclusionFilter";

import products from "@fakeAPI/data/products";
import sales from "@fakeAPI/data/sales";

// const MAX_PRICE = 9999999;
const RELATED_ARRAY_MAX_LENGTH = 4;

export default class ProductsHandler {
  private productsIndexMap: Map<string, number>;
  private productsSaleMap: Map<string, { sale: IProductSale; prices: IPrices }>;

  constructor() {
    this.productsIndexMap = new Map();
    products.forEach((product, index) => {
      this.productsIndexMap.set(product.id, index);
    });

    this.productsSaleMap = new Map();
    sales.forEach((sale) => {
      sale.products.forEach((product) => {
        this.productsSaleMap.set(product.id, {
          sale: {
            name: sale.name,
            discont: product.discont,
            expiration: product.expiration,
          },
          prices: product.prices,
        });
      });
    });
  }

  private filter(filter: IFakeApiProductFilter) {
    const result: IProduct[] = [];

    if ("id" in filter) {
      const index = this.productsIndexMap.get(filter.id as string);
      if (index !== undefined) result.push(products[index]);
      return result;
    }

    if ("name" in filter) {
      const filterName = (filter.name as string).toLowerCase();
      result.push(
        ...products.filter((product) =>
          product.name.toLowerCase().includes(filterName)
        )
      );
      if (result.length === 0) return result;
    }

    // if ("sale" in filter) {
    //   if (result.length > 0) {
    //     exclusionFilter(
    //       result,
    //       (product) => product.sale?.name !== filter.sale
    //     );
    //   } else {
    //     result.push(
    //       ...products.filter((product) => product.sale?.name === filter.sale)
    //     );
    //   }
    //   if (result.length === 0) return result;
    // }

    if ("category" in filter) {
      if (result.length > 0) {
        exclusionFilter(
          result,
          (product) => product.category !== filter.category
        );
      } else {
        result.push(
          ...products.filter((product) => product.category === filter.category)
        );
      }
      if (result.length === 0) return result;
    }

    // if (filter.minPrice !== undefined && filter.maxPrice !== undefined) {
    //   const minPrice = filter.minPrice;
    //   const maxPrice = filter.maxPrice === 0 ? MAX_PRICE : filter.maxPrice;
    //   if (result.length > 0) {
    //     exclusionFilter(result, (product) => {
    //       const productPrice = product.sale
    //         ? product.sale.prices.full
    //         : product.prices.full;
    //       return productPrice < minPrice || productPrice > maxPrice;
    //     });
    //   } else {
    //     result.push(
    //       ...products.filter((product) => {
    //         const productPrice = product.sale
    //           ? product.sale.prices.pix
    //           : product.prices.pix;
    //         return productPrice >= minPrice && productPrice <= maxPrice;
    //       })
    //     );
    //   }
    //   if (result.length === 0) return result;
    // }

    if ("tags" in filter) {
      if (result.length > 0) {
        exclusionFilter(result, (product) => {
          for (const filterTag of filter.tags as string[]) {
            if (product.tags.includes(filterTag)) return false;
          }
          return true;
        });
      }
    }

    return result;
  }

  private injectSales(products: IProduct[]) {
    for (let i = 0; i < products.length; i++) {
      const productSale = this.productsSaleMap.get(products[i].id);
      if (!productSale) return;
      products[i].sale = productSale.sale;
      products[i].prices = productSale.prices;
    }
  }

  public getSuggestions(search: string) {
    return this.getByFilter({ name: search }).map((product) => ({
      id: product.id,
      name: product.name,
    }));
  }

  // Temporário
  public getRecentlyViewed(): IProduct[] {
    const productHandler = new ProductsHandler();
    return productHandler.getByIdList([
      "026333169",
      "688377899",
      "C45F042A9",
      "9764E9629",
    ]);
  }

  public getRelated(productId: string): IProduct[] {
    const baseProduct = this.getByFilter({ id: productId })[0];
    if (baseProduct === undefined) return [];
    return products
      .filter(
        (product) =>
          product.category === baseProduct.category &&
          baseProduct.id !== product.id
      )
      .slice(0, RELATED_ARRAY_MAX_LENGTH);
  }

  public getByIdList(idList: string[]) {
    return idList
      .map((id) => this.getByFilter({ id })[0])
      .filter((product) => product !== undefined);
  }

  public getByFilter(filter: IFakeApiProductFilter) {
    const filteredProducts = this.filter(filter);
    this.injectSales(filteredProducts);
    return filteredProducts;
  }
}
