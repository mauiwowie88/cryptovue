<template>
  <div class="chart">
    <h1>Price</h1>
    <apexchart
      width="100%"
      height="350"
      type="area"
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
          id: "coinChart",
          fontFamily: "Outfit, sans-serif",
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: [],
          axisTicks: {
            show: false,
          },
          labels: {
            style: {
              colors: "#6d7572",
              fontSize: "20px",
            },
            formatter: function (value) {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            },
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
        stroke: {
          colors: ["#59E9D5"],
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0.5,
            opacityFrom: 0.6,
            opacityTo: 0.9,
            colorStops: [
              {
                offset: 0,
                color: "#59E9D5",
                opacity: 0.69,
              },
              {
                offset: 100,
                color: "#59E9D5",
                opacity: 0,
              },
            ],
          },
        },
        tooltip: {
          x: {
            format: "MMM dd 'at' HH:mm",
          },
          y: {
            formatter: function (value) {
              return value.toFixed(2);
            },
            title: {
              formatter: () => "",
            },
          },
          marker: {
            show: true,
            fillColors: ["#59E9D5"],
          },
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
      if (!data || !Array.isArray(data)) {
        console.error("No valid historical data provided");
        return;
      }

      const prices = data.map((item) => item.price ?? 0);
      const categories = data.map((item) => item.date);

      this.series = [{ name: "Price", data: prices }];

      this.options = {
        ...this.options,
        xaxis: {
          ...this.options.xaxis,
          categories,
        },
      };
    },
  },
};
</script>

<style scoped>
.chart {
  max-width: var(--breakpoint-lg);
  margin: 5rem auto;
}

h1 {
  font-size: var(--font-size-title2);
  padding: 3.3rem 1rem;
}
</style>
