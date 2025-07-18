import products from "./products";

export default class ProductsAPI {
  private productsIndexMap: Map<string, number>;

  constructor() {
    this.productsIndexMap = new Map();
    for (let i = 0; i < products.length; i++) {
      this.productsIndexMap.set(products[i].id, i);
    }
  }

  getProductById(id: string) {
    const index = this.productsIndexMap.get(id);
    return index === undefined ? undefined : products[index];
  }
}
