import { bannersTable, type Banner } from "@fakeAPI/data/banners";
import { Query } from "./Query";

type BannerPatterns = {
  default: {
    id: string;
    link: string;
    alt: string;
    baseSrc: string;
    baseWidth: number;
    baseHeight: number;
    responsiveVersions: {
      width: number;
      height: number;
      src: string;
    }[];
  };
};

class BannersQuery extends Query<Banner> {
  public selectById(id: string) {
    const origin = this.externalSelect ? bannersTable.data : this.buffer;
    this.setBuffer(origin.find((b) => b.id === id));
    return this;
  }

  private inDefaultPattern(): BannerPatterns["default"][] {
    return this.buffer.map((b) => structuredClone(b));
  }

  public get() {
    return this.inDefaultPattern();
  }

  public getUnique(): BannerPatterns["default"] | undefined {
    return this.inDefaultPattern()[0];
  }
} 

export { BannersQuery };
