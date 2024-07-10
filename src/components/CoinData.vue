<template>
  <div id="data-container">
    <div v-for="coin in coins" :key="coin.id" class="coin">
      <p>Name: {{ coin.name }}</p>
      <p>Last Updated: {{ formatDate(coin.last_updated) }}</p>
      <p>Current Price: ${{ coin.current_price }}</p>
      <p>Market Cap: ${{ coin.market_cap }}</p>
      <p>Popularity (Market Cap Rank): {{ coin.market_cap_rank }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoinData",
  props: {
    coins: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "America/Chicago",
      };
      return date.toLocaleDateString("en-US", options) + " CT";
    },
  },
};
</script>

<style></style>
