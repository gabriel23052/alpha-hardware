import products from "./data/products";

export default class ProductsAPI {
  private productsIndexMap: Map<string, number>;

  constructor() {
    this.productsIndexMap = new Map();
    for (let i = 0; i < products.length; i++) {
      this.productsIndexMap.set(products[i].id, i);
    }
  }

  public getProductsById(ids: string | string[]) {
    const result: IProduct[] = [];
    if (typeof ids === "string") ids = [ids];
    ids.forEach((id) => {
      const index = this.productsIndexMap.get(id);
      if (index === undefined) return;
      result.push(products[index]);
    });
    return result;
  }
}
