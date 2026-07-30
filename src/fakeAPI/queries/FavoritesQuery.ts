import { LocalStorageTable } from "@fakeAPI/tables/LocalStorageTable";
import { Query } from "./Query";
import { config } from "@fakeAPI/config";
import { ProductsQuery } from "./ProductsQuery";
import type { Product } from "@fakeAPI/tables/ProductsTable";

type Favorite = {
  default: {
    userId: string;
    productId: string;
  };
  productId: string;
  resolvedProduct: Product["card"];
};

const SCHEMA_VERSION = 1;

class FavoritesQuery extends Query<Favorite["default"]> {
  private table = new LocalStorageTable<Favorite["default"]>(
    config.localStorageKeys.favorites,
    SCHEMA_VERSION,
  );

  public createAndInsert(userId: string, productId: string) {
    if (this.exists(userId, productId)) {
      return null;
    }
    const favorite = {
      userId,
      productId,
    };
    this.table.push(favorite);
    return favorite;
  }

  public delete(userId: string, productId: string) {
    const index = this.table
      .getData()
      .findIndex((f) => f.productId === productId && f.userId === userId);
    if (index < 0) return;
    this.table.delete(index);
  }

  public exists(userId: string, productId: string) {
    return this.table
      .getData()
      .some((f) => f.productId === productId && f.userId === userId);
  }

  public selectByUserId(userId: string) {
    const origin = this.externalSelect ? this.table.getData() : this.buffer;
    this.setBuffer(origin.filter((f) => f.userId === userId));
    return this;
  }

  private inDefaultPattern(): Favorite["default"][] {
    return structuredClone(this.buffer);
  }

  private inResolvedProductPattern(): Favorite["resolvedProduct"][] {
    const productQuery = new ProductsQuery();
    return this.buffer.map((f) => {
      const product = productQuery.selectById(f.productId).getUnique("card");
      if (!product) throw new Error("Product mismatch in favorite");
      productQuery.clear();
      return product;
    });
  }

  private inProductIdPattern(): Favorite["productId"][] {
    return this.buffer.map((f) => f.productId);
  }

  public get(pattern: "default"): Favorite["default"][];
  public get(pattern: "resolvedProduct"): Favorite["resolvedProduct"][];
  public get(pattern: "productId"): Favorite["productId"][];
  public get(pattern: keyof Favorite) {
    if (pattern === "default") {
      return this.inDefaultPattern();
    }
    if (pattern === "resolvedProduct") {
      return this.inResolvedProductPattern();
    }
    if (pattern === "productId") {
      return this.inProductIdPattern();
    }
    return this.inDefaultPattern();
  }

  public getUnique(pattern: "default"): Favorite["default"] | undefined;
  public getUnique(
    pattern: "resolvedProduct",
  ): Favorite["resolvedProduct"] | undefined;
  public getUnique(pattern: "productId"): Favorite["productId"] | undefined;
  public getUnique(
    pattern: keyof Favorite,
  ): Favorite[keyof Favorite] | undefined {
    if (pattern === "default") {
      return this.inDefaultPattern()[0];
    }
    if (pattern === "resolvedProduct") {
      return this.inResolvedProductPattern()[0];
    }
    if (pattern === "productId") {
      return this.inProductIdPattern()[0];
    }
    return this.inDefaultPattern()[0];
  }
}

export { FavoritesQuery };
