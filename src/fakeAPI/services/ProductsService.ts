import type { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";
import { ProductsQuery } from "@fakeAPI/queries/ProductsQuery";
import type { Product } from "@fakeAPI/tables/ProductsTable";

export type ProductFilter = {
  search?: string;
  saleId?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
};

export type ProductAllPatterns =
  | Product["default"]
  | Product["card"]
  | Product["relatedNeeds"]
  | Product["suggestion"];

export type ProductSort =
  | "alphabetical"
  | "increasingPrice"
  | "decreasingPrice";

export type ProductQuery = {
  filter: ProductFilter;
  pattern: keyof Product;
  sort?: ProductSort;
};

export type ProductIdQuery = {
  id: string;
};

class ProductsService {
  private getFilteredQuery(filter: ProductFilter) {
    const productsQuery = new ProductsQuery();

    if (filter.search !== undefined) {
      productsQuery.selectByName(filter.search);
    }
    if (filter.saleId !== undefined) {
      productsQuery.selectBySaleId(filter.saleId);
    }
    if (filter.category !== undefined) {
      productsQuery.selectByCategory(filter.category);
    }
    if (filter.maxPrice !== undefined) {
      productsQuery.selectByMaxPrice(filter.maxPrice);
    }
    if (filter.minPrice !== undefined) {
      productsQuery.selectByMaxPrice(filter.minPrice);
    }
    if (filter.tags !== undefined) {
      productsQuery.selectByTags(filter.tags);
    }

    return productsQuery;
  }

  public getProductById(
    response: FakeAPIResponse<Product["default"] | null>,
    productId: string,
  ) {
    const productsQuery = new ProductsQuery();
    const product = productsQuery.selectById(productId).getUnique("default");
    if (!product) {
      return response.setData(null);
    }
    return response.setData(product);
  }

  public getByQuery(
    response: FakeAPIResponse<ProductAllPatterns[]>,
    query: ProductQuery,
  ) {
    const filteredQuery = this.getFilteredQuery(query.filter);
    switch (query.sort) {
      case "alphabetical":
        filteredQuery.sortByName();
        break;
      case "decreasingPrice":
        filteredQuery.sortByDecreasingPrice();
        break;
      case "increasingPrice":
        filteredQuery.sortByIncreasingPrice();
    }
    switch (query.pattern) {
      case "default":
        return response.setData(filteredQuery.get("default"));
      case "card":
        return response.setData(filteredQuery.get("card"));
      case "suggestion":
        return response.setData(filteredQuery.get("suggestion"));
    }
  }

  public getRelated(
    response: FakeAPIResponse<Product["card"][]>,
    productId: string,
  ) {
    const productsQuery = new ProductsQuery();
    const product = productsQuery
      .selectById(productId)
      .getUnique("relatedNeeds");
    if (!product) {
      return response.setError("PRODUCT_RELATED_PRODUCT_NOT_FOUND");
    }

    const relatedProducts = productsQuery
      .clear()
      .selectByCategory(product.category)
      .get("card")
      .sort(
        (pA, pB) =>
          Math.abs(pA.price.pix - product.pixPrice) -
          Math.abs(pB.price.pix - product.pixPrice),
      )
      .slice(1, 5);
    response.setData(relatedProducts);
  }
}

export { ProductsService };
