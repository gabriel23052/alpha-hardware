import { products, productsIdMap } from "@fakeAPI/data/products";
import { saleModifierMap } from "@fakeAPI/data/sales";
import { normalizeSearchText } from "@fakeAPI/utils/normalizeSearchText";

import { SalesTable } from "./SalesTable";

class ProductsTable {
  public empty = true;
  private products: FAProduct[] = [];

  public searchById(id: string) {
    const product = productsIdMap.get(id);
    if (!product) {
      this.setProducts([]);
      return;
    }
    this.setProducts(product);
  }

  public searchByIdList(idList: string[]) {
    const products: FAProduct[] = [];
    for (const id of idList) {
      const product = productsIdMap.get(id);
      if (!product) continue;
      products.push(product);
    }
    this.setProducts(products);
  }

  public searchByFilter(filter: FAProductFilter) {
    let filteredProducts: FAProduct[] = products;
    if ("search" in filter) {
      const searchName = normalizeSearchText(filter.search as string);
      filteredProducts = filteredProducts.filter((p) => {
        return p.searchName.includes(searchName);
      });
    }
    if ("saleId" in filter) {
      filteredProducts = filteredProducts.filter(
        (product) => saleModifierMap.get(product.id)?.id === filter.saleId,
      );
    }
    if (filteredProducts.length !== 0 && "category" in filter) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filter.category,
      );
    }
    if (filteredProducts.length !== 0 && "minPrice" in filter) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          this.getFinalPixPrice(product.id) >= (filter.minPrice as number),
      );
    }
    if (filteredProducts.length !== 0 && "maxPrice" in filter) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          this.getFinalPixPrice(product.id) <= (filter.maxPrice as number),
      );
    }
    if (filteredProducts.length !== 0 && "tags" in filter) {
      const tags = filter.tags as string[];
      if (tags.length === 0) filteredProducts = [];
      tags.forEach((tag) => {
        filteredProducts = filteredProducts.filter((product) =>
          product.tags.includes(tag),
        );
      });
    }
    this.setProducts(filteredProducts);
  }

  public sort(sort: FAProductSort) {
    switch (sort) {
      case "alphabetical":
        this.setProducts(
          this.products.sort((pA, pB) => pA.name.localeCompare(pB.name)),
        );
        break;
      case "increasingPrice":
        this.setProducts(
          this.products.sort((pA, pB) => {
            const subtraction =
              this.getFinalPixPrice(pA.id) - this.getFinalPixPrice(pB.id);
            if (subtraction !== 0) return subtraction;
            return pA.id.localeCompare(pB.id);
          }),
        );
        break;
      case "decreasingPrice":
        this.setProducts(
          this.products.sort((pA, pB) => {
            const subtraction =
              this.getFinalPixPrice(pB.id) - this.getFinalPixPrice(pA.id);
            if (subtraction !== 0) return subtraction;
            return pA.id.localeCompare(pB.id);
          }),
        );
    }
  }

  public get() {
    return structuredClone(this.products);
  }

  public getInFullFormat() {
    const productsClone = structuredClone(this.products);
    productsClone.forEach(SalesTable.injectSale);
    return productsClone;
  }

  public getInPriceFormat() {
    const productsClone = structuredClone(this.products);
    productsClone.forEach(SalesTable.injectSale);
    return productsClone.map<FAProduct_Price>(({ id, prices }) => ({
      id,
      pixPrice: prices.pix,
    }));
  }

  public getInSuggestionFormat() {
    return this.products.map<FAProduct_Suggestion>(
      ({ id, name, searchName }) => ({
        id,
        name,
        searchName,
      }),
    );
  }

  public getInCardFormat() {
    const productsClone = structuredClone(this.products);
    productsClone.forEach(SalesTable.injectSale);
    return productsClone.map((product) => {
      const productInCardFormat: FAProduct_Card = {
        id: product.id,
        name: product.name,
        prices: product.prices,
        media: {
          thumb: product.media.thumb,
        },
      };
      if (product.sale) productInCardFormat.sale = product.sale;
      return productInCardFormat;
    });
  }

  private getFinalPixPrice(productId: string) {
    const salePrices = SalesTable.getSalePrices(productId);
    return salePrices
      ? salePrices.pix
      : (productsIdMap.get(productId) as FAProduct).prices.pix;
  }

  private setProducts(newProducts: FAProduct | FAProduct[]) {
    if (Array.isArray(newProducts)) {
      this.products = newProducts;
      this.empty = this.products.length === 0;
      return;
    }
    this.products = [newProducts];
    this.empty = false;
  }
}

export { ProductsTable };
