// src/utils/cache.js
export function getCachedData(key) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  const now = new Date().getTime();

  // Check if the cached data is older than 5 minutes (5 * 60 * 1000 ms)
  if (now - timestamp > 5 * 60 * 1000) {
    localStorage.removeItem(key);
    return null;
  }

  return data;
}

export function setCachedData(key, data) {
  const timestamp = new Date().getTime();
  const value = JSON.stringify({ data, timestamp });
  localStorage.setItem(key, value);
}
