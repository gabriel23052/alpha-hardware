import { create } from "zustand";

type FavoritesStore = {
  favorites: Set<string>;
  isBlockedToEdit: boolean;
};

const useFavoritesStore = create<FavoritesStore>(() => ({
  favorites: new Set<string>(),
  isBlockedToEdit: false,
}));

export { useFavoritesStore };
