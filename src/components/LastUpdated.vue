<template>
  <p class="last-updated">
    <span>Last Updated</span>
    <span class="breakpoint">{{ formattedDate }}</span>
  </p>
</template>

<script>
import { formatDate } from "@/utils/format";

export default {
  name: "LastUpdated",
  props: {
    timestamp: {
      type: String,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      return formatDate(this.timestamp);
    },
  },
};
</script>

<style scoped>
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
  margin-left: 0.5rem;
}

@media (max-width: 768px) {
  .last-updated {
    font-size: var(--font-size-caption);
    flex-direction: column;
  }
  .breakpoint {
    display: block;
    margin-left: 0;
  }
}
</style>
