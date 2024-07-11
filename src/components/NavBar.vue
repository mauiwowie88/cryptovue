<template>
  <nav>
    <img :src="logo" alt="Logo" />
    <button @click="toggleCoins(0)">BIT</button>
    <button @click="toggleCoins(1)">ETH</button>
    <img :src="image" alt="Selected Coin" />
  </nav>
</template>

<script>
import logo from "@/assets/images/logo.svg";

export default {
  name: "NavBar",
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    toggleCoins: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      logo,
    };
  },
};
</script>

<style></style>
