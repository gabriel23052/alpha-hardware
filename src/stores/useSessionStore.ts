import { create } from "zustand";
import { persist } from "zustand/middleware";

const LOCAL_STORAGE_KEY = "session-persistence";

type SessionStore =
  | {
      isLoggedIn: false;
      user: null;
      login: (user: IUser) => void;
      logout: () => void;
    }
  | {
      isLoggedIn: true;
      user: IUser;
      login: (user: IUser) => void;
      logout: () => void;
    };

const useSessionStore = create(
  persist<SessionStore>(
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (user: IUser) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    { name: LOCAL_STORAGE_KEY },
  ),
);

export { useSessionStore };
