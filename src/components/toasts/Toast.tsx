import { useEffect, useRef, useState } from "react";

import { type ToastT } from "@stores/useToastsStore";

import { toasts } from "@features/toasts";

import SVGSuccess from "@svg/success.svg?react";
import SVGToastError from "@svg/fail.svg?react";

import classes from "./Toast.module.css";

type Props = {
  toast: ToastT;
  pos: number;
};

const TOAST_HEIGHT_REM = 3;
const GAP_REM = 0.5;
const REMOVING_ANIMATION_DURATION = 200;

const Toast = ({ toast, pos }: Props) => {
  const animationTimeout = useRef<number | null>(null);

  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    animationTimeout.current = window.setTimeout(
      () => {
        setIsRemoving(true);
      },
      Math.max(toast.duration - REMOVING_ANIMATION_DURATION, 0),
    );

    const timeout = window.setTimeout(() => {
      toasts.dismiss(toast.id);
    }, toast.duration);

    return () => {
      clearTimeout(timeout);
      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    if (isRemoving) return;
    setIsRemoving(true);
    animationTimeout.current = window.setTimeout(() => {
      toasts.dismiss(toast.id);
    }, REMOVING_ANIMATION_DURATION);
  };

  return (
    <button
      className={`text-default lneutral-xlight ${classes.container}`}
      type="button"
      style={{
        bottom: `${GAP_REM + (TOAST_HEIGHT_REM * pos + GAP_REM * pos)}rem`,
      }}
      data-isremoving={isRemoving}
      data-type={toast.type}
      onClick={handleClick}
    >
      {toast.type === "success" && (
        <SVGSuccess width={16} height={16} aria-hidden="true" />
      )}
      {toast.type === "fail" && (
        <SVGToastError width={16} height={16} aria-hidden="true" />
      )}
      {toast.message}
    </button>
  );
};

export default Toast;
