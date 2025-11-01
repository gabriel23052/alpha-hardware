import exclusionFilter from "@utils/exclusionFilter";

import products from "@fakeAPI/data/products";
import sales from "@fakeAPI/data/sales";

const MAX_PRICE = 9999999;
const RELATED_ARRAY_MAX_LENGTH = 4;

export default class ProductsHandler {
  private productsMap: Map<string, IProduct>;
  private productsSaleMap: Map<string, { sale: IProductSale; prices: IPrices }>;

  constructor() {
    this.productsMap = new Map();
    products.forEach((product) => {
      this.productsMap.set(product.id, product);
    });

    this.productsSaleMap = new Map();
    sales.forEach((sale) => {
      sale.products.forEach((product) => {
        this.productsSaleMap.set(product.id, {
          sale: {
            id: sale.id,
            name: sale.name,
            discont: product.discont,
            expiration: product.expiration,
          },
          prices: product.prices,
        });
      });
    });
  }

  private getProducts(filter: IFakeApiProductFilter) {
    const result: IProduct[] = [];

    if ("id" in filter) {
      if (typeof filter.id === "string") filter.id = [filter.id];
      filter.id?.forEach((id) => {
        const product = this.productsMap.get(id);
        if (product) result.push(product);
      });
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

    if ("sale" in filter) {
      const sale = sales.find((sale) => sale.id === filter.sale);
      if (sale) {
        if (result.length > 0) {
          exclusionFilter(
            result,
            (product) =>
              !this.productsSaleMap.has(product.id) ||
              this.productsSaleMap.get(product.id)?.sale.id !== filter.sale
          );
        } else {
          result.push(
            ...this.select({
              id: sale.products.map((product) => product.id),
            }).products
          );
        }
      }
      if (result.length === 0) return result;
    }

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

    if ("minPrice" in filter || "maxPrice" in filter) {
      const minPrice = filter.minPrice ?? 0;
      const maxPrice = filter.maxPrice ?? MAX_PRICE;
      if (result.length > 0) {
        exclusionFilter(result, (product) => {
          const productSale = this.productsSaleMap.get(product.id);
          const productPrice = productSale
            ? productSale.prices.pix
            : product.prices.pix;
          return productPrice < minPrice || productPrice > maxPrice;
        });
      } else {
        result.push(
          ...products.filter((product) => {
            const productSale = this.productsSaleMap.get(product.id);
            const productPrice = productSale
              ? productSale.prices.pix
              : product.prices.pix;
            return productPrice >= minPrice && productPrice <= maxPrice;
          })
        );
      }
      if (result.length === 0) return result;
    }

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

  private selectSale(id: string) {
    return sales.find((sale) => sale.id === id);
  }

  public selectSuggestions(search: string) {
    return this.getProducts({ name: search }).map((product) => ({
      id: product.id,
      name: product.name,
    }));
  }

  // Temporário
  public selectRecentlyViewed() {
    return {
      products: this.getProducts({
        id: ["026333169", "688377899", "C45F042A9", "9764E9629"],
      }),
    };
  }

  public selectRelated(baseProductId: string): IProductGroup {
    const baseProduct = this.getProducts({ id: baseProductId });
    if (baseProduct === undefined) return { products: [] };
    return {
      products: this.getProducts({
        category: baseProduct[0].category,
      })
        .filter((product) => product.id !== baseProductId)
        .slice(0, RELATED_ARRAY_MAX_LENGTH),
    };
  }

  public select(filter: IFakeApiProductFilter) {
    const productGroup: IProductGroup = { products: [] };
    productGroup.products = this.getProducts(filter);
    this.injectSales(productGroup.products);
    if ("sale" in filter && typeof filter.sale === "string") {
      const sale = this.selectSale(filter.sale);
      if (sale) productGroup.meta = { saleName: sale.name };
    }
    if ("sortBy" in filter) {
      productGroup.products =
        filter.sortBy === "increasingPrice"
          ? productGroup.products.sort((a, b) => a.prices.pix - b.prices.pix)
          : productGroup.products.sort((a, b) => b.prices.pix - a.prices.pix);
    }
    return productGroup;
  }
}
