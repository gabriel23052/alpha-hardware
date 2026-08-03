import { create } from "zustand";

export type ToastT = {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
};

export type ToastType = "success" | "fail";

type ToastStore = {
  toasts: Map<number, ToastT>;
};

const useToastStore = create<ToastStore>(() => ({
  toasts: new Map<number, ToastT>(),
}));

export { useToastStore };
