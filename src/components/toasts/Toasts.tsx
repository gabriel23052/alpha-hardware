import Toast from "./Toast";

import { useToastStore } from "@stores/useToastsStore";

import classes from "./Toasts.module.css";

const Toasts = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <dialog
      className={classes.container}
      aria-hidden={toasts.values.length === 0}
    >
      {[...toasts.values()].map((t, i) => (
        <Toast toast={t} key={t.id} pos={i} />
      ))}
    </dialog>
  );
};

export default Toasts;
