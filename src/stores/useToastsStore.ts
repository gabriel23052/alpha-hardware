import { create } from "zustand";

export type ToastType = "success" | "fail";

export type ToastT = {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
};

type ToastStore = {
  toasts: ToastT[];
  add: (message: string, type: ToastType, duration: number) => number;
  dismiss: (id: number) => void;
};

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  add: (message, type, duration) => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }],
    }));
    return id;
  },

  dismiss: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));

export { useToastStore };
