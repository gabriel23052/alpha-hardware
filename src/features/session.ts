import { useSessionStore } from "@stores/useSessionStore";

const session = {
  start: (user: IUser) => {
    useSessionStore.setState({ user, isLoggedIn: true });
  },

  finish: () => {
    useSessionStore.setState({ user: null, isLoggedIn: false });
  },
};

export { session };
