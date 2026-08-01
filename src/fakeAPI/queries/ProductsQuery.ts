import { ProductsTable, type Product } from "@fakeAPI/tables/ProductsTable";
import { SalesTable } from "@fakeAPI/tables/SalesTable";
import { Query } from "./Query";
import { Utils } from "@fakeAPI/Utils";

class ProductsQuery extends Query<Product["default"]> {
  public existsById(id: string) {
    return ProductsTable.indexMap.has(id);
  }

  public selectById(id: string) {
    if (this.externalSelect) {
      this.setBuffer(ProductsTable.indexMap.get(id));
    } else {
      this.setBuffer(this.buffer.find((p) => p.id == id));
    }
    return this;
  }

  public selectByIdList(idList: string[]) {
    if (this.externalSelect) {
      this.setBuffer(
        idList
          .map((id) => ProductsTable.indexMap.get(id))
          .filter((p) => p !== undefined),
      );
    } else {
      this.setBuffer(this.buffer.filter((p) => idList.includes(p.id)));
    }
    return this;
  }

  public selectByName(search: string) {
    const origin = this.externalSelect ? ProductsTable.data : this.buffer;
    const searchName = Utils.normalizeSearchText(search);
    this.setBuffer(origin.filter((p) => p.searchName.includes(searchName)));
    return this;
  }

  public selectBySaleId(saleId: string) {
    const origin = this.externalSelect ? ProductsTable.data : this.buffer;
    this.setBuffer(
      origin.filter((p) => {
        const saleProducts = SalesTable.saleProductMap.get(saleId);
        if (!saleProducts || !saleProducts.includes(p.id)) return false;
        return true;
      }),
    );
    return this;
  }

  public selectByCategory(category: string) {
    const origin = this.externalSelect ? ProductsTable.data : this.buffer;
    this.setBuffer(origin.filter((p) => p.category === category));
    return this;
  }

  public selectByMinPrice(minPrice: number) {
    const origin = this.externalSelect ? ProductsTable.data : this.buffer;
    this.setBuffer(origin.filter((p) => this.getFinalPrice(p).pix >= minPrice));
    return this;
  }

  public selectByMaxPrice(maxPrice: number) {
    const origin = this.externalSelect ? ProductsTable.data : this.buffer;
    this.setBuffer(origin.filter((p) => this.getFinalPrice(p).pix <= maxPrice));
    return this;
  }

  public selectByTags(tags: string[]) {
    if (tags.length === 0) {
      this.setBuffer(null);
      return this;
    }
    let buffer = this.externalSelect ? ProductsTable.data : this.buffer;
    tags.forEach((tag) => {
      buffer = buffer.filter((p) => p.tags.includes(tag));
    });
    this.setBuffer(buffer);
    return this;
  }

  public sortByName() {
    this.setBuffer(
      this.buffer.sort((pA, pB) => pA.name.localeCompare(pB.name)),
    );
    return this;
  }

  public sortByIncreasingPrice() {
    this.setBuffer(
      this.buffer.sort((pA, pB) => {
        const subtraction =
          this.getFinalPrice(pA).pix - this.getFinalPrice(pB).pix;
        if (subtraction !== 0) return subtraction;
        return pA.id.localeCompare(pB.id);
      }),
    );
    return this;
  }

  public sortByDecreasingPrice() {
    this.setBuffer(
      this.buffer.sort((pA, pB) => {
        const subtraction =
          this.getFinalPrice(pB).pix - this.getFinalPrice(pA).pix;
        if (subtraction !== 0) return subtraction;
        return pA.id.localeCompare(pB.id);
      }),
    );
    return this;
  }

  private getFinalPrice(product: Product["default"]) {
    const salePrice = SalesTable.productModifierMap.get(product.id);
    if (salePrice) return salePrice.price;
    return product.price;
  }

  private inDefaultPattern(): Product["default"][] {
    return this.buffer.map((p) => {
      const result: Product["default"] = {
        id: p.id,
        name: p.name,
        searchName: p.searchName,
        category: p.category,
        price: structuredClone(this.getFinalPrice(p)),
        media: structuredClone(p.media),
        tags: [...p.tags],
        description: p.description,
        specs: p.specs,
      };
      const productModifier = SalesTable.productModifierMap.get(p.id);
      if (productModifier) result.sale = productModifier.sale;
      return result;
    });
  }

  private inCardPattern(): Product["card"][] {
    return this.buffer.map((p) => {
      const result: Product["card"] = {
        id: p.id,
        name: p.name,
        price: structuredClone(this.getFinalPrice(p)),
        media: {
          thumb: p.media.thumb,
        },
      };
      const productModifier = SalesTable.productModifierMap.get(p.id);
      if (productModifier) result.sale = productModifier.sale;
      return result;
    });
  }

  private inSuggestionPattern(): Product["suggestion"][] {
    return this.buffer.map((p) => ({
      id: p.id,
      name: p.name,
      searchName: p.searchName,
    }));
  }

  private inRelatedNeedsPattern(): Product["relatedNeeds"][] {
    return this.buffer.map((p) => ({
      category: p.category,
      pixPrice: this.getFinalPrice(p).pix,
    }));
  }

  public get(pattern: "default"): Product["default"][];
  public get(pattern: "card"): Product["card"][];
  public get(pattern: "suggestion"): Product["suggestion"][];
  public get(pattern: "relatedNeeds"): Product["relatedNeeds"][];
  public get(pattern: keyof Product) {
    if (pattern === "default") {
      return this.inDefaultPattern();
    }
    if (pattern === "card") {
      return this.inCardPattern();
    }
    if (pattern === "suggestion") {
      return this.inSuggestionPattern();
    }
    if (pattern === "relatedNeeds") {
      return this.inRelatedNeedsPattern();
    }
    return this.inDefaultPattern();
  }

  public getUnique(pattern: "default"): Product["default"] | undefined;
  public getUnique(pattern: "card"): Product["card"] | undefined;
  public getUnique(pattern: "suggestion"): Product["suggestion"] | undefined;
  public getUnique(
    pattern: "relatedNeeds",
  ): Product["relatedNeeds"] | undefined;
  public getUnique(
    pattern: keyof Product,
  ): Product[keyof Product] | undefined {
    if (pattern === "default") {
      return this.inDefaultPattern()[0];
    }
    if (pattern === "card") {
      return this.inCardPattern()[0];
    }
    if (pattern === "suggestion") {
      return this.inSuggestionPattern()[0];
    }
    if (pattern === "relatedNeeds") {
      return this.inRelatedNeedsPattern()[0];
    }
    return this.inDefaultPattern()[0];
  }
}

export { ProductsQuery };
