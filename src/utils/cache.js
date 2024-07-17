const CACHE_KEY = "CoinKey";
const CHART_DATA_KEY = "ChartData";
const CACHE_TIMESTAMP_KEY = "CoinTimestamp";
const CHART_TIMESTAMP_KEY = "ChartTimestamp";

export function getCachedCoins() {
  const cachedCoins = localStorage.getItem(CACHE_KEY);
  const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
  if (!cachedCoins || !cachedTimestamp) return null;

  const now = new Date().getTime();
  if (now - parseInt(cachedTimestamp, 10) > 10 * 60 * 1000) {
    console.log("Coin data is older than 10 minutes, fetching new data");
    return null;
  }

  return JSON.parse(cachedCoins);
}

export function setCachedCoins(coins) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(coins));
  localStorage.setItem(CACHE_TIMESTAMP_KEY, new Date().getTime().toString());
}

export function getCachedChartData() {
  const cachedChartData = localStorage.getItem(CHART_DATA_KEY);
  const cachedTimestamp = localStorage.getItem(CHART_TIMESTAMP_KEY);
  if (!cachedChartData || !cachedTimestamp) return null;

  const now = new Date().getTime();
  if (now - parseInt(cachedTimestamp, 10) > 10 * 60 * 1000) {
    console.log("Chart data is older than 10 minutes, fetching new data");
    return null;
  }

  return JSON.parse(cachedChartData);
}

export function setCachedChartData(chartData) {
  localStorage.setItem(CHART_DATA_KEY, JSON.stringify(chartData));
  localStorage.setItem(CHART_TIMESTAMP_KEY, new Date().getTime().toString());
}
