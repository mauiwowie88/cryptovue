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
        this.coins = await fetchCoinData();
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
