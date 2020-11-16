<template>
  <line-chart
    :chart-data="data"
    :options="{
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: function (value, index, values) {
                return '$' + value;
              },
            },
          },
        ],
      },
      responsive: true,
      maintainAspectRatio: false,
    }"
    :height="height || 300"
  ></line-chart>
</template>

<script>
import LineChart from "./index.js";

export default {
  props: ["data", "height", "options"],
  components: {
    LineChart,
  },
};
</script>
