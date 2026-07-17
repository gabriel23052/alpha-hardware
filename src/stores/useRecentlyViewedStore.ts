import { convertProductToCardFormat } from "@utils/convertProductToCardFormat";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type RecentlyViewedStore = {
  products: IProduct_Card[];
  set: (productsToSet: IProduct_Card[]) => void;
  lastApiUpdate: number | null;
};

const RECENTLY_VIEWED_LENGTH = 4;
const LOCAL_STORAGE_KEY = "recently-viewed";

const useRecentlyViewedStore = create(
  persist<RecentlyViewedStore>(
    (set) => ({
      products: [],
      lastApiUpdate: null,
      set: (productsToSet: IProduct_Card[]) => {
        set({
          products: productsToSet,
        });
      },
    }),
    {
      name: LOCAL_STORAGE_KEY,
    },
  ),
);

const recentlyViewedHandler = {
  addProduct: (product: IProduct_Full) => {
    const productCard = convertProductToCardFormat(product);
    const products = [...useRecentlyViewedStore.getState().products];
    const set = useRecentlyViewedStore.getState().set;
    const index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      set([products[index], ...products.filter((p) => p.id !== product.id)]);
      return;
    }
    if (products.length < RECENTLY_VIEWED_LENGTH) {
      set([productCard, ...products]);
      return;
    }
    products.pop();
    products.unshift(product);
    set(products);
  },
};

export { useRecentlyViewedStore, recentlyViewedHandler };
