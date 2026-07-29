import { collectionsTable, type Collection } from "@fakeAPI/data/collections";

import { ProductsQuery, type ProductPatterns } from "./ProductsQuery";
import { Query } from "./Query";

type CollectionPatterns = {
  default: {
    id: string;
    name: string;
    products: ProductPatterns["card"][];
  };
};

class CollectionsQuery extends Query<Collection> {
  public selectById(id: string) {
    const origin = this.externalSelect ? collectionsTable.data : this.buffer;
    this.setBuffer(origin.find((c) => c.id === id));
    return this;
  }

  private inDefaultPattern(): CollectionPatterns["default"][] {
    const productQuery = new ProductsQuery();
    return this.buffer.map((c) => {
      productQuery.clear();
      return {
        id: c.id,
        name: c.name,
        products: productQuery.selectByIdList(c.products).get("card"),
      };
    });
  }

  public get(): CollectionPatterns["default"][] {
    return this.inDefaultPattern();
  }

  public getUnique(): CollectionPatterns["default"] | undefined {
    return this.inDefaultPattern()[0];
  }
}

export { CollectionsQuery };
