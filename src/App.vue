<template>
  <div id="app">
    <NavBar
      v-if="coins.length > 0"
      :title="coins[selectedCoin].id"
      :image="coins[selectedCoin].image"
      :toggle-coin="(index) => (selectedCoin = index)"
      :selectedCoin="selectedCoin"
    />
    <CoinSection v-if="coins.length > 0" :coin="coins[selectedCoin]" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import CoinSection from "./components/CoinSection.vue";
import { fetchCoinData } from "./utils/api";
import { getCachedCoins, setCachedCoins } from "./utils/cache";

export default {
  name: "App",
  components: {
    NavBar,
    CoinSection,
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
        const coins = await fetchCoinData();
        if (!coins) {
          throw new Error("Coins data is undefined");
        }
        this.coins = coins;
        setCachedCoins(coins);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async fetchCachedData() {
      const cachedCoins = getCachedCoins();
      if (cachedCoins) {
        console.log("Using cached data");
        this.coins = cachedCoins;
      } else {
        console.log("No cached data found, fetching new data");
        await this.loadData();
      }
    },
  },
  created() {
    this.fetchCachedData();
  },
};
</script>

<style></style>
