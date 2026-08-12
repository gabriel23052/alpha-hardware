import type { TUser } from "../app.types";

import { useSessionStore } from "@stores/useSessionStore";

const session = {
  start: (user: TUser) => {
    useSessionStore.setState({ user, isLoggedIn: true });
  },

  finish: () => {
    useSessionStore.setState({ user: null, isLoggedIn: false });
  },
};

export { session };
