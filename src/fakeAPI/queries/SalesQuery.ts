import { salesTable, type Sale } from "@fakeAPI/data/sales";
import { Query } from "./Query";
import { ProductsQuery, type ProductPatterns } from "./ProductsQuery";

type SalePatterns = {
  default: {
    id: string;
    name: string;
    productModifiers: {
      productId: string;
      expiration: number;
      discont: number;
      price: {
        full: number;
        pix: number;
        pixDiscont: number;
        maxInstallments: number;
        installments: number;
        previous: number;
      };
    }[];
  };
  resolvedProducts: {
    id: string;
    name: string;
    products: ProductPatterns["card"][];
  };
};

class SalesQuery extends Query<Sale> {
  public selectById(id: string) {
    const origin = this.externalSelect ? salesTable.data : this.buffer;
    this.setBuffer(origin.find((s) => s.id === id));
    return this;
  }

  private inDefaultPattern(): SalePatterns["default"][] {
    return this.buffer.map((s) => structuredClone(s));
  }

  private inResolvedProductsPattern(): SalePatterns["resolvedProducts"][] {
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

  public get(pattern: "default"): SalePatterns["default"][];
  public get(pattern: "resolvedProducts"): SalePatterns["resolvedProducts"][];
  public get(pattern: keyof SalePatterns) {
    if (pattern === "default") {
      return this.inDefaultPattern();
    }
    if (pattern === "resolvedProducts") {
      return this.inResolvedProductsPattern();
    }
    return this.inDefaultPattern();
  }

  public getUnique(pattern: "default"): SalePatterns["default"] | undefined;
  public getUnique(
    pattern: "resolvedProducts",
  ): SalePatterns["resolvedProducts"] | undefined;
  public getUnique(
    pattern: keyof SalePatterns,
  ): SalePatterns[keyof SalePatterns] | undefined {
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
