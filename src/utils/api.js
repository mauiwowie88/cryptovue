import axios from "axios";
import bitcoin from "@/assets/images/bit.png";
import ethereum from "@/assets/images/eth.png";

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
