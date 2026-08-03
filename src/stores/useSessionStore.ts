import { create } from "zustand";
import { persist } from "zustand/middleware";

const LOCAL_STORAGE_KEY = "session-persistence";

type SessionStore =
  | {
      isLoggedIn: false;
      user: null;
    }
  | {
      isLoggedIn: true;
      user: IUser;
    };

const useSessionStore = create(
  persist<SessionStore>(
    () => ({
      isLoggedIn: false,
      user: null,
    }),
    { name: LOCAL_STORAGE_KEY },
  ),
);

export { useSessionStore };
