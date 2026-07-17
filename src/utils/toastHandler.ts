import { useToastStore } from "@stores/useToastsStore";

export const toastHandler = {
  success: (message: string, duration: number = 4000) => {
    return useToastStore.getState().add(message, "success", duration);
  },

  fail: (message: string, duration: number = 4000) => {
    return useToastStore.getState().add(message, "fail", duration);
  },

  dismiss: (id: number) => {
    useToastStore.getState().dismiss(id);
  },
};
