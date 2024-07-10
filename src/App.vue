<template>
  <div id="app">
    <button @click="loadData">Fetch Data</button>
    <CoinData :coins="coins" />
  </div>
</template>

<script>
import CoinData from "./components/CoinData.vue";

export default {
  name: "App",
  components: {
    CoinData,
  },
  data() {
    return {
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
        this.coins = jsonData;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style></style>
