import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import VueApexCharts from "vue3-apexcharts";
import "element-plus/dist/index.css";
import "./styles.css";

const app = createApp(App);
app.use(ElementPlus);
app.use(VueApexCharts);
app.mount("#app");
