import { useToastStore, type ToastType } from "@stores/useToastsStore";

const toasts = {
  emit: (message: string, type: ToastType, duration: number = 4000) => {
    const id = Date.now();
    useToastStore.setState((state) => {
      const newMap = new Map(state.toasts);
      newMap.set(id, {
        id,
        type,
        message,
        duration,
      });
      return {
        toasts: newMap,
      };
    });
    return id;
  },

  dismiss: (id: number) => {
    useToastStore.setState((state) => {
      const newMap = new Map(state.toasts);
      newMap.delete(id);
      return {
        toasts: newMap,
      };
    });
  },
};

export { toasts };
