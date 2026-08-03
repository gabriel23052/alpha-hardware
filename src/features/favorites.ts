import { Main } from "@fakeAPI/Main";
import { useFavoritesStore } from "@stores/useFavoritesStore";
import { toastHandler } from "@utils/toastHandler";

const favorites = {
  addProduct: async (productId: string) => {
    useFavoritesStore.setState((state) => {
      const newFavoritesSet = new Set<string>(state.favorites);
      newFavoritesSet.add(productId);
      return { favorites: newFavoritesSet, isBlockedToEdit: true };
    });
    const fakeApiFetch = Main.request("POST api/favorites", { productId });
    const response = await fakeApiFetch.response;
    if (response) {
      useFavoritesStore.setState({ isBlockedToEdit: false });
      if (response.success) {
        toastHandler.success("Produto adicionado aos favoritos");
      } else {
        console.error(response.error.id);
        useFavoritesStore.setState((state) => {
          const newFavoritesSet = new Set<string>(state.favorites);
          newFavoritesSet.delete(productId);
          return { favorites: newFavoritesSet };
        });
        toastHandler.fail(response.error.message);
      }
    }
  },

  removeProduct: async (productId: string) => {
    useFavoritesStore.setState((state) => {
      const newFavoritesSet = new Set<string>(state.favorites);
      newFavoritesSet.delete(productId);
      return { favorites: newFavoritesSet, isBlockedToEdit: true };
    });
    const fakeApiFetch = Main.request("DELETE api/favorites", { productId });
    const response = await fakeApiFetch.response;
    if (response) {
      useFavoritesStore.setState({ isBlockedToEdit: false });
      if (response.success) {
        toastHandler.success("Produto removido dos favoritos");
      } else {
        console.error(response.error.id);
        toastHandler.fail(response.error.message);
      }
    }
  },

  requestAllFromUser: async () => {
    const fakeApiFetch = Main.request("GET api/favorites", {
      pattern: "productId",
    });
    const response = await fakeApiFetch.response;
    if (response) {
      if (response.success) {
        useFavoritesStore.setState({
          favorites: new Set(response.data as string[]),
        });
        return;
      } else {
        console.error(response.error.id);
        toastHandler.fail(response.error.message);
      }
    }
  },

  clear: () => {
    useFavoritesStore.setState({ favorites: new Set() });
  },
};

export { favorites };
