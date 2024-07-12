<template>
  <div class="buttons-container">
    <el-button
      @click="toggleCoin(0)"
      :class="['btn', { active: selectedCoin === 0 }]"
      aria-label="Toggle to Bitcoin data"
    >
      BTC
    </el-button>
    <el-button
      @click="toggleCoin(1)"
      :class="['btn', { active: selectedCoin === 1 }]"
      aria-label="Toggle to Ethereum data"
    >
      ETH
    </el-button>
  </div>
</template>

<script>
export default {
  name: "ButtonsContainer",
  props: {
    toggleCoin: {
      type: Function,
      required: true,
    },
    selectedCoin: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.buttons-container {
  margin: 2rem;
}
.btn {
  border-radius: 15px;
  border: none;
}
.active {
  background-color: var(--fg-2);
  color: white;
}
</style>
