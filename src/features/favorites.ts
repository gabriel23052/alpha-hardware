import { request } from "@fakeAPI/request";
import { useFavoritesStore } from "@stores/useFavoritesStore";
import { toastHandler } from "@utils/toastHandler";

const favorites = {
  add: async (productId: string) => {
    const favoritesStore = useFavoritesStore.getState();
    favoritesStore.add(productId);
    favoritesStore.blockToEdit();
    const fakeApiFetch = request("POST api/favorites", { productId });
    const response = await fakeApiFetch.response;
    if (response) {
      favoritesStore.unblockToEdit();
      if (response.success) {
        toastHandler.success("Produto adicionado aos favoritos");
      } else {
        console.error(response.error.id);
        useFavoritesStore.getState().remove(productId);
        toastHandler.fail(response.error.message);
      }
    }
  },

  remove: async (productId: string) => {
    const favoritesStore = useFavoritesStore.getState();
    favoritesStore.remove(productId);
    favoritesStore.blockToEdit();
    const fakeApiFetch = request("DELETE api/favorites", { productId });
    const response = await fakeApiFetch.response;
    if (response) {
      favoritesStore.unblockToEdit();
      if (response.success) {
        toastHandler.success("Produto removido dos favoritos");
      } else {
        console.error(response.error.id);
        toastHandler.fail(response.error.message);
      }
    }
  },

  requestAllFromUser: async () => {
    const favoritesStore = useFavoritesStore.getState();
    const fakeApiFetch = request("GET api/favorites", { format: "onlyIds" });
    const response = await fakeApiFetch.response;

    if (response) {
      console.log(response);
      if (response.success) {
        favoritesStore.set(response.data as string[]);
        return;
      } else {
        console.error(response.error.id);
        toastHandler.fail(response.error.message);
      }
    }
  },

  clear: () => {
    const favoritesStore = useFavoritesStore.getState();
    favoritesStore.set([]);
  },
};

export { favorites };
