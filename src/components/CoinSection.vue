<template>
  <div class="coin-data-container">
    <h1 class="coin-name">{{ capitalizedCoinId }}</h1>
    <LastUpdated :timestamp="coin.last_updated" />
    <el-row class="cards-container">
      <CoinCard
        v-for="info in coinInfo"
        :key="info.title"
        :title="info.title"
        :value="info.value"
      />
    </el-row>
  </div>
</template>

<script>
import LastUpdated from "./LastUpdated.vue";
import CoinCard from "./CoinCard.vue";

export default {
  name: "CoinSection",
  components: {
    LastUpdated,
    CoinCard,
  },
  props: {
    coin: {
      type: Object,
      required: true,
    },
  },
  computed: {
    capitalizedCoinId() {
      return this.coin.id
        ? this.coin.id.charAt(0).toUpperCase() + this.coin.id.slice(1)
        : "";
    },
    coinInfo() {
      return [
        { title: "Current Price", value: this.coin.current_price },
        { title: "Market Cap", value: this.coin.market_cap },
        { title: "Popularity", value: `#${this.coin.market_rank}` },
      ];
    },
  },
};
</script>

<style scoped>
.coin-data-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.coin-name {
  line-height: var(--line-height-title1);
  font-size: var(--font-size-title1);
  margin-top: var(--line-height-title2);
}

.cards-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: var(--line-height-body);
}

@media (max-width: 768px) {
  .cards-container {
    flex-direction: column; /* Change to column direction on small screens */
  }
}
</style>
