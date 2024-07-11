<template>
  <div>
    <p>{{ coin.id }}</p>
    <p>Last Updated {{ formatDate(coin.last_updated) }}</p>
    <p>Current Price: ${{ coin.current_price }}</p>
    <p>Market Cap: ${{ coin.market_cap }}</p>
    <p>Popularity #{{ coin.market_rank }}</p>
  </div>
</template>

<script>
export default {
  name: "CoinData",
  props: {
    coin: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
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
