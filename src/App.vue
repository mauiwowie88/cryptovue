<template>
  <div id="app">
    <NavBar
      v-if="coins.length > 0"
      :title="coins[selectedCoin].id"
      :image="coins[selectedCoin].image"
      :toggle-coin="(index) => (selectedCoin = index)"
      :selectedCoin="selectedCoin"
    />
    <CoinData v-if="coins.length > 0" :coin="coins[selectedCoin]" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import CoinData from "./components/CoinData.vue";
import bitcoin from "@/assets/images/bit.png";
import ethereum from "@/assets/images/eth.png";

export default {
  name: "App",
  components: {
    NavBar,
    CoinData,
  },
  data() {
    return {
      selectedCoin: 1,
      coins: [],
    };
  },
  methods: {
    async loadData() {
      try {
        const proxyUrl = "https://api.allorigins.win/get?url=";
        const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum&sparkline=false&_=${new Date().getTime()}`;
        const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
        const data = await response.json();
        const jsonData = JSON.parse(data.contents);

        this.coins = jsonData.map((coin) => ({
          id: coin.id,
          current_price: coin.current_price,
          market_cap: coin.market_cap,
          market_rank: coin.market_cap_rank,
          last_updated: coin.last_updated,
          image: coin.id === "bitcoin" ? bitcoin : ethereum,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style></style>
