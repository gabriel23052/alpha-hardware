import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TProduct } from "../app.types";

type RecentlyViewedStore = {
  products: TProduct["card"][];
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
