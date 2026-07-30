import { SalesTable, type Sale } from "@fakeAPI/tables/SalesTable";
import { Query } from "./Query";
import { ProductsQuery } from "./ProductsQuery";

class SalesQuery extends Query<Sale["default"]> {
  public selectById(id: string) {
    const origin = this.externalSelect ? SalesTable.data : this.buffer;
    this.setBuffer(origin.find((s) => s.id === id));
    return this;
  }

  private inDefaultPattern(): Sale["default"][] {
    return this.buffer.map((s) => structuredClone(s));
  }

  private inResolvedProductsPattern(): Sale["resolvedProducts"][] {
    const productQuery = new ProductsQuery();
    return this.buffer.map((s) => {
      const productIds = s.productModifiers.map((pM) => pM.productId);
      const products = productQuery.selectByIdList(productIds).get("card");
      productQuery.clear();
      return {
        id: s.id,
        name: s.name,
        products,
      };
    });
  }

  public get(pattern: "default"): Sale["default"][];
  public get(pattern: "resolvedProducts"): Sale["resolvedProducts"][];
  public get(pattern: keyof Sale) {
    if (pattern === "default") {
      return this.inDefaultPattern();
    }
    if (pattern === "resolvedProducts") {
      return this.inResolvedProductsPattern();
    }
    return this.inDefaultPattern();
  }

  public getUnique(pattern: "default"): Sale["default"] | undefined;
  public getUnique(
    pattern: "resolvedProducts",
  ): Sale["resolvedProducts"] | undefined;
  public getUnique(
    pattern: keyof Sale,
  ): Sale[keyof Sale] | undefined {
    if (pattern === "default") {
      return this.inDefaultPattern()[0];
    }
    if (pattern === "resolvedProducts") {
      return this.inResolvedProductsPattern()[0];
    }
    return this.inDefaultPattern()[0];
  }
}

export { SalesQuery };
