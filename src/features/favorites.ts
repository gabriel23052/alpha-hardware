import { Main } from "@fakeAPI/Main";
import { useFavoritesStore } from "@stores/useFavoritesStore";
import { toasts } from "@features/toasts";

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
        toasts.emit("Produto adicionado aos favoritos", "success");
      } else {
        console.error(response.error.id);
        useFavoritesStore.setState((state) => {
          const newFavoritesSet = new Set<string>(state.favorites);
          newFavoritesSet.delete(productId);
          return { favorites: newFavoritesSet };
        });
        toasts.emit(response.error.message, "fail");
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
        toasts.emit("Produto removido dos favoritos", "success");
        return true;
      } else {
        console.error(response.error.id);
        toasts.emit(response.error.message, "fail");
        return false;
      }
    }
    return false;
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
        toasts.emit(response.error.message, "fail");
      }
    }
  },

  clear: () => {
    useFavoritesStore.setState({ favorites: new Set() });
  },
};

export { favorites };
