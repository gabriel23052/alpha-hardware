import { create } from "zustand";

type FavoritesStore = {
  favoritesIds: Set<string>;
  isBlockedToEdit: boolean;
  blockToEdit: () => void;
  unblockToEdit: () => void;
  set: (productIds: string[]) => void;
  add: (productId: string) => void;
  remove: (productId: string) => void;
};

const useFavoritesStore = create<FavoritesStore>((set) => ({
  favoritesIds: new Set<string>(),
  isBlockedToEdit: false,

  blockToEdit: () => set({ isBlockedToEdit: true }),

  unblockToEdit: () => set({ isBlockedToEdit: false }),

  set: (productIds: string[]) => {
    set({ favoritesIds: new Set<string>(productIds) });
  },

  add: (productId: string) => {
    set((prev) => {
      const favorites = new Set<string>(prev.favoritesIds);
      favorites.add(productId);
      return { favoritesIds: favorites };
    });
  },

  remove: (productId: string) => {
    set((prev) => {
      const favorites = new Set<string>(prev.favoritesIds);
      favorites.delete(productId);
      return { favoritesIds: favorites };
    });
  },
}));

export { useFavoritesStore };
