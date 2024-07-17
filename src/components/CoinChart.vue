<template>
  <div>
    <apexchart
      v-if="isClient"
      type="line"
      :options="chartOptions"
      :series="series"
      width="100%"
      height="400"
    ></apexchart>
  </div>
</template>

<script>
import ApexCharts from "vue3-apexcharts";

export default {
  name: "CoinChart",
  components: {
    apexchart: ApexCharts,
  },
  data() {
    return {
      isClient: false,
      series: [],
      chartOptions: {
        chart: {
          id: "vuechart-example",
          animations: {
            enabled: true,
          },
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: [],
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        grid: {
          show: false,
        },
        markers: {
          size: 0,
        },
        tooltip: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
      },
    };
  },
  mounted() {
    this.isClient = true;
  },
  props: {
    historicalData: {
      type: Object,
      required: true,
    },
  },
  watch: {
    historicalData: {
      immediate: true,
      handler(newData) {
        this.updateChart(newData);
      },
    },
  },
  methods: {
    updateChart(data) {
      if (!data || !data.bitcoin || !data.ethereum) {
        console.error("Data is missing required properties");
        return;
      }

      const bitcoinPrices = data.bitcoin.map((item) => item.close ?? 0);
      const ethereumPrices = data.ethereum.map((item) => item.close ?? 0);

      this.series = [
        { name: "Bitcoin", data: bitcoinPrices },
        { name: "Ethereum", data: ethereumPrices },
      ];

      this.chartOptions = {
        ...this.chartOptions,
        xaxis: {
          ...this.chartOptions.xaxis,
          categories: bitcoinPrices.map((_, index) => `Day ${index + 1}`),
        },
      };
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
