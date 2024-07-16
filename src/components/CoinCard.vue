<template>
  <el-col class="card-column">
    <el-card class="card">
      <h2 class="card-title">{{ title }}</h2>
      <p class="card-value">{{ formattedValue }}</p>
    </el-card>
  </el-col>
</template>

<script>
import { formatValue } from "@/utils/format";

export default {
  name: "CoinCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: [Number, String],
      required: true,
    },
  },
  computed: {
    formattedValue() {
      return this.title !== "Popularity" ? formatValue(this.value) : this.value;
    },
  },
};
</script>

<style scoped>
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

.card-title {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  text-align: center;
  margin: 0;
}

.card-value {
  font-size: var(--font-size-title3);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin: 0;
}
</style>
