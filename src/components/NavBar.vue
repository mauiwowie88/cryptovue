<template>
  <nav>
    <img :src="logo" alt="Logo" class="logo" />
    <ButtonsContainer :toggleCoin="toggleCoin" :selectedCoin="selectedCoin" />
    <img :src="image" :alt="`${title} header image`" class="coin-image" />
  </nav>
</template>

<script>
import logo from "@/assets/images/logo.svg";
import ButtonsContainer from "@/components/ButtonsContainer.vue";

export default {
  name: "NavBar",
  components: {
    ButtonsContainer,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    toggleCoin: {
      type: Function,
      required: true,
    },
    selectedCoin: {
      type: Number,
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

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.logo {
  margin: 1rem auto;
}
.coin-image {
  height: 370px;
  width: 100%;
  object-fit: cover;
  margin: 0 auto;
}
@media (max-width: 768px) {
  .logo {
    width: 15rem;
  }
  .coin-image {
    height: 240px;
  }
}
</style>
