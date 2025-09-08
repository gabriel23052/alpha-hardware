export default function debounce<T extends unknown[]>(func: (...args: T) => unknown, delay: number) {
  let timeout: number | undefined = undefined;
  return (...args: T) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), delay);
  };
}
