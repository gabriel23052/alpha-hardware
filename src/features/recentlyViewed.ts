import type { TProduct } from "../app.types";

import { useRecentlyViewedStore } from "@stores/useRecentlyViewedStore";
import { convertProductToCardFormat } from "@utils/convertProductToCardFormat";

const RECENTLY_VIEWED_LENGTH = 4;

const recentlyViewed = {
  addProduct: (product: TProduct["default"]) => {
    useRecentlyViewedStore.setState((state) => {
      const products = state.products;
      const index = products.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        return {
          products: [
            products[index],
            ...products.filter((p) => p.id !== product.id),
          ],
        };
      }
      if (products.length < RECENTLY_VIEWED_LENGTH) {
        return {
          products: [convertProductToCardFormat(product), ...products],
        };
      }
      products.pop();
      products.unshift(product);
      return { products };
    });
  },
};

export { recentlyViewed };
