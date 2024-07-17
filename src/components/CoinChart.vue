<template>
  <div class="chart">
    <apexchart
      type="line"
      :options="chartOptions"
      :series="series"
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
  props: {
    historicalData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [],
        },
      },
    };
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
      const bitcoinPrices = data.bitcoin.map((item) =>
        item.close !== undefined ? item.close : 0
      );
      const ethereumPrices = data.ethereum.map((item) =>
        item.close !== undefined ? item.close : 0
      );

      if (!bitcoinPrices.length || !ethereumPrices.length) {
        console.warn("Data arrays are empty");
        return;
      }
      this.series = [
        {
          name: "Bitcoin",
          data: bitcoinPrices,
        },
        {
          name: "Ethereum",
          data: ethereumPrices,
        },
      ];

      const categories = bitcoinPrices.map((_, index) => `Day ${index + 1}`);

      this.chartOptions = {
        ...this.chartOptions,
        xaxis: {
          ...this.chartOptions.xaxis,
          categories,
        },
      };

      console.log("Updated chart options:", this.chartOptions);
      console.log("Updated series data:", this.series);
    },
  },
};
</script>

<style>
.chart {
  width: 99%;
}
</style>
