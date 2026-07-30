import { BannersTable, type Banner } from "@fakeAPI/tables/BannersTable";
import { Query } from "./Query";

class BannersQuery extends Query<Banner["default"]> {
  public selectById(id: string) {
    const origin = this.externalSelect ? BannersTable.data : this.buffer;
    this.setBuffer(origin.find((b) => b.id === id));
    return this;
  }

  private inDefaultPattern(): Banner["default"][] {
    return this.buffer.map((b) => structuredClone(b));
  }

  public get() {
    return this.inDefaultPattern();
  }

  public getUnique(): Banner["default"] | undefined {
    return this.inDefaultPattern()[0];
  }
}

export { BannersQuery };
