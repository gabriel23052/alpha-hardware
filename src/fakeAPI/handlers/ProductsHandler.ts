import type { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";
import { ProductsQuery } from "@fakeAPI/queries/ProductsQuery";

class ProductsHandler {
  public getProductById(
    response: FakeAPIResponse<FAProduct | null>,
    productId: string,
  ) {
    const productsQuery = new ProductsQuery();
    const product = productsQuery.selectById(productId).getUnique("default");
    if (!product) {
      return response.setData(null);
    }
    return response.setData(product);
  }

  private getFilteredQuery(filter: FAProductFilter) {
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

  public getByQuery(
    response: FakeAPIResponse<FAProductFormats[]>,
    query: FAProductQuery,
  ) {
    const filteredQuery = this.getFilteredQuery(query.filter);
    switch (query.sort) {
      case "alphabetical":
        filteredQuery.sortByName();
        break;
      case "decreasingPrice":
        filteredQuery.sortByDecreasingPrice();
        break;
      default:
        filteredQuery.sortByIncreasingPrice();
    }
    switch (query.format) {
      case "full":
        return response.setData(filteredQuery.get("default"));
      case "card":
        return response.setData(filteredQuery.get("card"));
      case "suggestion":
        return response.setData(filteredQuery.get("suggestion"));
    }
  }

  public getRelated(
    response: FakeAPIResponse<FAProduct_Card[]>,
    productId: string,
  ) {
    const productsQuery = new ProductsQuery();
    const product = productsQuery
      .selectById(productId)
      .getUnique("relatedNeeds");
    if (!product) return response.setData([]);

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

export { ProductsHandler };
