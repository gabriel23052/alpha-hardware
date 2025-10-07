import { useRef } from "react";

export default function useDebounce<T extends unknown[]>(
  func: (...args: T) => unknown,
  delay: number
) {
  const timeout = useRef<number | undefined>(undefined);
  return (...args: T) => {
    clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => func(...args), delay);
  };
}
