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
    <CoinChart
      v-if="historicalData.bitcoin.length && historicalData.ethereum.length"
      :historicalData="historicalData[coins[selectedCoin].id]"
    />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import CoinSection from "./components/CoinSection.vue";
import CoinChart from "./components/CoinChart.vue";
import { fetchCoinData, fetchHistoricalData } from "./utils/api";
import {
  getCachedCoins,
  setCachedCoins,
  getCachedChartData,
  setCachedChartData,
} from "./utils/cache";

export default {
  name: "App",
  components: {
    NavBar,
    CoinSection,
    CoinChart,
  },
  data() {
    return {
      selectedCoin: 0,
      coins: [],
      historicalData: {
        bitcoin: [],
        ethereum: [],
      },
    };
  },
  methods: {
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
    async loadData() {
      try {
        const coins = await fetchCoinData();
        console.log("Fetched coin data", coins);
        this.coins = coins;
        setCachedCoins(coins);
        console.log("Updated coins state after loadData:", this.coins);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async loadHistoricalData() {
      try {
        const cachedChartData = getCachedChartData();
        if (cachedChartData) {
          console.log("Using cached chart data", cachedChartData);
          this.historicalData = cachedChartData;
        } else {
          const bitcoinData = await fetchHistoricalData("bitcoin");
          const ethereumData = await fetchHistoricalData("ethereum");

          this.historicalData.bitcoin = bitcoinData;
          this.historicalData.ethereum = ethereumData;
          setCachedChartData(this.historicalData);
        }
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    },
  },
  created() {
    this.fetchCachedData();
    this.loadHistoricalData();
  },
};
</script>

<style></style>
