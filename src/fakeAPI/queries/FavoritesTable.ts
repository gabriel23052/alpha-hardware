import { config } from "@fakeAPI/config";

class FavoritesTable {
  private data: FAFavorite[] = [];
  private buffer: FAFavorite[] = [];

  constructor() {
    this.readFromLocalStorage();
  }

  private readFromLocalStorage() {
    const localStorageKey = config.localStorageKeys.favorites;
    const favoritesJson = localStorage.getItem(localStorageKey);
    if (typeof favoritesJson !== "string") {
      localStorage.setItem(localStorageKey, "[]");
      this.data = [];
      return;
    }
    this.data = JSON.parse(favoritesJson);
  }

  private saveInLocalStorage() {
    localStorage.setItem(
      config.localStorageKeys.favorites,
      JSON.stringify(this.data),
    );
  }

  public addFavorite(favorite: FAFavorite) {
    if (
      this.data.find(
        (f) =>
          f.productId === favorite.productId && f.userId === favorite.userId,
      )
    ) {
      return;
    }
    this.data.push(favorite);
    this.saveInLocalStorage();
  }

  public removeFavorite(favorite: FAFavorite) {
    const index = this.data.findIndex(
      (f) => f.productId === favorite.productId && f.userId === favorite.userId,
    );
    if (index < 0) {
      return;
    }
    this.data.splice(index, 1);
    this.saveInLocalStorage();
  }

  public searchByUserId(userId: string) {
    this.buffer = this.data.filter((f) => f.userId === userId);
  }

  public get() {
    return this.buffer;
  }
}

export { FavoritesTable };
