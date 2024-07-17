<template>
  <div class="coin-chart">
    <apexchart
      width="100%"
      height="400"
      type="line"
      :options="options"
      :series="series"
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
      options: {
        chart: {
          id: "vuechart-example",
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: [],
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        grid: {
          show: false,
        },
      },
      series: [],
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
      if (!data) {
        console.error("No historical data provided");
        return;
      }

      const bitcoinPrices = data.bitcoin.map((item) => item.price ?? 0);
      const ethereumPrices = data.ethereum.map((item) => item.price ?? 0);
      const categories = data.bitcoin.map((item) => item.date);

      this.series = [
        { name: "Bitcoin", data: bitcoinPrices },
        { name: "Ethereum", data: ethereumPrices },
      ];

      this.options = {
        ...this.options,
        xaxis: {
          ...this.options.xaxis,
          categories,
        },
      };
    },
  },
  created() {
    console.log("1", this.historicalData);
  },
};
</script>

<style scoped>
.coin-chart {
  padding: 0 4rem;
}
</style>

<!-- <script>
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
            show: true,
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
</script> -->
