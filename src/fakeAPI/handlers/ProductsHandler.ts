import type { FakeAPIResponse } from "@fakeAPI/FakeAPIResponse";
import { ProductsTable } from "@fakeAPI/tables/ProductsTable";

class ProductsHandler {
  public getProductById(
    response: FakeAPIResponse<FAProduct | null>,
    productId: string,
  ) {
    const productsTable = new ProductsTable();
    productsTable.searchById(productId);
    if (productsTable.empty) {
      return response.setData(null);
    }
    return response.setData(productsTable.getInFullFormat()[0]);
  }

  public getByQuery(
    response: FakeAPIResponse<FAProductFormats[]>,
    query: FAProductQuery,
  ) {
    const productsTable = new ProductsTable();
    productsTable.searchByFilter(query.filter);
    if (productsTable.empty) return response.setData([]);
    if (query.sort) productsTable.sort(query.sort);
    switch (query.format) {
      case "full":
        return response.setData(productsTable.getInFullFormat());
      case "card":
        return response.setData(productsTable.getInCardFormat());
      case "suggestion":
        return response.setData(productsTable.getInSuggestionFormat());
    }
  }

  public getRelated(
    response: FakeAPIResponse<FAProduct_Card[]>,
    productId: string,
  ) {
    const productsTable = new ProductsTable();
    productsTable.searchById(productId);
    if (productsTable.empty) return response.setData([]);
    const product = productsTable.getInFullFormat()[0];
    productsTable.searchByFilter({ category: product.category });
    const sameCategoryProducts = productsTable.getInPriceFormat();
    const relatedProductsIds = sameCategoryProducts
      .map(({ id, pixPrice }) => ({
        id,
        difference: Math.abs(pixPrice - product.prices.pix),
      }))
      .sort((difA, difB) => difA.difference - difB.difference)
      .slice(1, 5)
      .map(({ id }) => id);
    productsTable.searchByIdList(relatedProductsIds);
    response.setData(productsTable.getInCardFormat());
  }

  // Temporário
  public getRecentlyViewed(response: FakeAPIResponse<FAProduct_Card[]>) {
    const productsTable = new ProductsTable();
    const idList = [
      "PRO-026333169",
      "PRO-688377899",
      "PRO-002350C9D",
      "PRO-2107D4DB3",
    ];
    productsTable.searchByIdList(idList);
    return response.setData(productsTable.getInCardFormat());
  }
}

export { ProductsHandler };
