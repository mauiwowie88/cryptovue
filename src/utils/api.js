import axios from "axios";
import bitcoin from "@/assets/images/bit.png";
import ethereum from "@/assets/images/eth.png";
// import { jsonParse } from "./format";

export async function fetchCoinData() {
  const proxyUrl = "https://api.allorigins.win/get?url=";
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum&sparkline=false&_=${new Date().getTime()}`;

  try {
    const response = await axios.get(proxyUrl + encodeURIComponent(apiUrl));
    const jsonData = JSON.parse(response.data.contents);

    if (!Array.isArray(jsonData)) {
      throw new TypeError("Expected an array but got: " + typeof jsonData);
    }

    return jsonData.map((coin) => ({
      id: coin.id,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      market_rank: coin.market_cap_rank,
      last_updated: coin.last_updated,
      image: coin.id === "bitcoin" ? bitcoin : ethereum,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
export async function fetchHistoricalData(coinId) {
  const proxyUrl = "https://api.allorigins.win/get?url=";
  const apiUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=5&interval=daily`;

  try {
    const response = await axios.get(proxyUrl + encodeURIComponent(apiUrl));
    // const jsonData = JSON.parse(response.data.contents);
    const jsonData = JSON.parse(response.data.contents);

    if (!jsonData || !jsonData.prices) {
      throw new Error("Invalid data received from API");
    }
    const weeklyData = jsonData.prices.map(([timestamp, price]) => ({
      date: new Date(timestamp).toLocaleDateString(),
      price,
    }));
    return weeklyData;
  } catch (error) {
    console.error(`Error fetching historical data for ${coinId}:`, error);
    throw error;
  }
}

export const getCoinData = async () => {
  try {
    const coins = await fetchCoinData();
    if (!coins) throw new Error("Coins data is undefined");
    return coins;
  } catch (error) {
    console.error("Error fetching coin data:", error);
    throw error;
  }
};

export const getHistoricalData = async (coin) => {
  try {
    const history = await fetchHistoricalData(coin);
    if (!history) throw new Error(`Historical data for ${coin} is undefined`);
    return history;
  } catch (error) {
    console.error(`Error fetching historical data for ${coin}:`, error);
    throw error;
  }
};
