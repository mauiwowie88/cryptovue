const CACHE_KEY = "CoinKey";
const CACHE_TIMESTAMP_KEY = "CoinTimestamp";

export function getCachedCoins() {
  const cachedCoins = localStorage.getItem(CACHE_KEY);
  const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
  if (!cachedCoins || !cachedTimestamp) return null;

  const now = new Date().getTime();
  if (now - parseInt(cachedTimestamp, 10) > 10 * 60 * 1000) {
    console.log("Data is older than 10 minutes, fetching new data");
    return null;
  }

  return JSON.parse(cachedCoins);
}

export function setCachedCoins(coins) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(coins));
  localStorage.setItem(CACHE_TIMESTAMP_KEY, new Date().getTime().toString());
}
