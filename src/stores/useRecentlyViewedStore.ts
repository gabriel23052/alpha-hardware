import { create } from "zustand";
import { persist } from "zustand/middleware";

type RecentlyViewedStore = {
  products: IProduct_Card[];
};

const LOCAL_STORAGE_KEY = "recently-viewed";

const useRecentlyViewedStore = create(
  persist<RecentlyViewedStore>(
    () => ({
      products: [],
    }),
    {
      name: LOCAL_STORAGE_KEY,
    },
  ),
);

export { useRecentlyViewedStore };
