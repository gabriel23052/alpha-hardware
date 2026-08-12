import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TUser } from "../app.types";

const LOCAL_STORAGE_KEY = "session-persistence";

type SessionStore =
  | {
      isLoggedIn: false;
      user: null;
    }
  | {
      isLoggedIn: true;
      user: TUser;
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
