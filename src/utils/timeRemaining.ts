const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

const cache = new Map<string, string>();

function timeRemaining(timestamp: number) {
  const now = Math.floor(Date.now() / 1000);
  const cacheKey = `${timestamp}-${now}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);
  for (const key of cache.keys()) {
    if (!key.endsWith(`-${now}`)) {
      cache.delete(key);
    }
  }
  const result = computeTimeRemaining(timestamp);
  cache.set(cacheKey, result);
  return result;
}

function computeTimeRemaining(timestamp: number) {
  let secondsUntilExpire = timestamp - Math.floor(new Date().getTime() / 1000);
  if (secondsUntilExpire <= 0) return "";
  const hours = Math.floor(secondsUntilExpire / SECONDS_IN_HOUR);
  const hoursStr = hours.toString().padStart(2, "0") + "h";
  secondsUntilExpire -= hours * SECONDS_IN_HOUR;
  const minutes = Math.floor(secondsUntilExpire / SECONDS_IN_MINUTE);
  const minutesStr = minutes.toString().padStart(2, "0") + "m";
  secondsUntilExpire -= minutes * SECONDS_IN_MINUTE;
  const secondsStr = secondsUntilExpire.toString().padStart(2, "0") + "s";
  return `${hoursStr} ${minutesStr} ${secondsStr}`;
}

export { timeRemaining };
