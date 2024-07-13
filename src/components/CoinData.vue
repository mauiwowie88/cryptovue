<template>
  <div class="coin-data-container">
    <h1 class="coin-name">{{ capitalizedCoinId }}</h1>
    <!-- <p class="last-updated">Last Updated {{ formatDate(coin.last_updated) }}</p> -->
    <p class="last-updated">
      <span>Last Updated</span>

      <span class="breakpoint">{{ formatDate(coin.last_updated) }}</span>
    </p>
    <el-row class="cards-container">
      <el-col v-for="info in coinInfo" :key="info.title" class="card-column">
        <el-card class="card">
          <h2 class="info-title">{{ info.title }}</h2>
          <p class="info-value">
            {{
              info.title !== "Popularity" ? formatValue(info.value) : info.value
            }}
          </p>
        </el-card>
      </el-col>
    </el-row>
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
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const dateOptions = { year: "numeric", month: "short", day: "numeric" };
      const timeOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "America/Chicago",
      };
      const formattedDate = date.toLocaleDateString("en-US", dateOptions);
      const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
      return `${formattedDate} at ${formattedTime} CT`;
    },
    formatValue(value) {
      switch (true) {
        case value >= 1000000000:
          return `$${(value / 1000000000).toFixed(1)}B`;
        case value >= 1000000:
          return `$${(value / 1000000).toFixed(1)}M`;
        case value >= 1000:
          return `$${(value / 1000).toFixed(1)}K`;
        default:
          return `$${value}`;
      }
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

.last-updated {
  line-height: var(--line-height-body);
  font-size: var(--font-size-body);
  color: var(--fg-2);
  margin: var(--line-height-caption) 0;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}

.breakpoint {
  margin-left: 0.5rem; /* Adjust as needed */
}

.cards-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: var(--line-height-body);
}

.card-column {
  flex: none;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  border: 1px solid var(--bg-3);
  width: 300px;
  margin: 1rem;
}

.info-title {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  text-align: center;
  margin: 0;
}

.info-value {
  font-size: var(--font-size-title3);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin: 0;
}

@media (max-width: 768px) {
  .cards-container {
    flex-direction: column; /* Change to column direction on small screens */
  }
  .last-updated {
    font-size: var(--font-size-caption);
    flex-direction: column; /* Force column direction on small screens */
  }
  .breakpoint {
    display: block;
    margin-left: 0; /* Remove margin for small screens */
  }
}
</style>
