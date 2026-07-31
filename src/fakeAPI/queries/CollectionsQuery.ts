import {
  CollectionsTable,
  type Collection,
} from "@fakeAPI/tables/CollectionsTable";
import { ProductsQuery } from "./ProductsQuery";
import { Query } from "./Query";

class CollectionsQuery extends Query<Collection["default"]> {
  public selectById(id: string) {
    const origin = this.externalSelect ? CollectionsTable.data : this.buffer;
    this.setBuffer(origin.find((c) => c.id === id));
    return this;
  }

  private inResolvedProductsPattern(): Collection["resolvedProducts"][] {
    const productQuery = new ProductsQuery();
    return this.buffer.map((c) => {
      const products = productQuery.selectByIdList(c.products).get("card");
      if (products.length !== c.products.length) {
        throw new Error("Product not found in collection");
      }
      productQuery.clear();
      return {
        id: c.id,
        name: c.name,
        products,
      };
    });
  }

  public get(): Collection["resolvedProducts"][] {
    return this.inResolvedProductsPattern();
  }

  public getUnique(): Collection["resolvedProducts"] | undefined {
    return this.inResolvedProductsPattern()[0];
  }
}

export { CollectionsQuery };
