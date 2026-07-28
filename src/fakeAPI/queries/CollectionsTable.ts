import { collections } from "@fakeAPI/data/collections";

import { ProductsQuery } from "./ProductsQuery";

class CollectionsTable {
  public empty = true;
  public collections: FACollection[] = [];

  public searchById(id: string) {
    const collection = collections.find((collection) => collection.id === id);
    if (!collection) {
      this.setCollections([]);
      return;
    }
    this.setCollections(collection);
  }

  public get() {
    return structuredClone(this.collections);
  }

  public getInPrCardFormat() {
    const collectionsInCardFormat: FACollection_PrCard[] = [];
    const productsQuery = new ProductsQuery();
    for (const collection of this.collections) {
      productsQuery.selectByIdList(collection.productsId);
      collectionsInCardFormat.push({
        id: collection.id,
        name: collection.name,
        products: productsQuery.get("card"),
      });
    }
    return collectionsInCardFormat;
  }

  private setCollections(newCollections: FACollection | FACollection[]) {
    if (Array.isArray(newCollections)) {
      this.collections = newCollections;
      this.empty = this.collections.length === 0;
      return;
    }
    this.collections = [newCollections];
    this.empty = false;
  }
}

export { CollectionsTable };
