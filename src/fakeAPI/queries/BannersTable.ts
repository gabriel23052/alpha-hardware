import { banners } from "@fakeAPI/data/banners";

class BannersTable {
  public empty = true;
  private banners: FABanner[] = [];

  public searchById(id: string) {
    const banner = banners.find((banner) => banner.id === id);
    if (!banner) {
      this.setBanners([]);
      return;
    }
    this.setBanners(banner);
  }

  public get() {
    return structuredClone(this.banners);
  }

  public getInFullFormat(): FABanner_Full[] {
    return structuredClone(this.banners);
  }

  private setBanners(newBanners: FABanner | FABanner[]) {
    if (Array.isArray(newBanners)) {
      this.banners = newBanners;
      this.empty = this.banners.length === 0;
      return;
    }
    this.banners = [newBanners];
    this.empty = false;
  }
}

export { BannersTable };
