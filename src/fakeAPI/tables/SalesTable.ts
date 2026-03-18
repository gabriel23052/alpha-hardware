import { saleModifierMap, sales } from "@fakeAPI/data/sales";

import { ProductsTable } from "./ProductsTable";

class SalesTable {
  public empty = true;
  private sales: FASale[] = [];

  public searchById(id: string) {
    const sale = sales.find((sale) => sale.id === id);
    if (!sale) {
      this.setSales([]);
      return;
    }
    this.setSales(sale);
  }

  public get() {
    return structuredClone(this.sales);
  }

  public getInPrCardFormat(): FASale_PrCard[] {
    const salesInCardFormat: FASale_PrCard[] = [];
    const productsTable = new ProductsTable();
    for (const sale of this.sales) {
      const productsIds = sale.saleModifiers.map(({ productId }) => productId);
      productsTable.searchByIdList(productsIds);
      salesInCardFormat.push({
        id: sale.id,
        name: sale.name,
        products: productsTable.getInCardFormat(),
      });
    }
    return salesInCardFormat;
  }

  private setSales(newSales: FASale | FASale[]) {
    if (Array.isArray(newSales)) {
      this.sales = newSales;
      this.empty = this.sales.length === 0;
      return;
    }
    this.sales = [newSales];
    this.empty = false;
  }

  public static getSalePrices(productId: string) {
    const saleModifier = saleModifierMap.get(productId);
    if (!saleModifier) return null;
    return saleModifier.modifier.salePrices;
  }

  public static injectSale(product: FAProduct) {
    const saleModifier = saleModifierMap.get(product.id);
    if (!saleModifier) return;
    product.prices = saleModifier.modifier.salePrices;
    product.sale = {
      id: saleModifier.id,
      name: saleModifier.name,
      expiration: saleModifier.modifier.expiration,
      discont: saleModifier.modifier.discont,
    };
  }
}

export { SalesTable };
