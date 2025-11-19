import { useCallback, useEffect, useRef } from "react";

export default function useDebounce<T extends unknown[]>(
  func: (...args: T) => unknown,
  delay: number
) {
  const timeoutRef = useRef<number | undefined>(undefined);

  const debouncedFunction = useCallback(
    (...args: T) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => func(...args), delay);
    },
    [func, delay]
  );

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return debouncedFunction;
}
