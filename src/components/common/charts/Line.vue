<template>
  <line-chart
    :data="datacollection"
    :options="{
      scales: {
        yAxes: [yAxes || defaultYAxes],
      },
      responsive: true,
      maintainAspectRatio: false,
    }"
    :height="height || 300"
    :key="new Date().toString()"
  ></line-chart>
</template>

<script>
import LineChart from "./index.js";

export default {
  props: ["height", "options", "labels", "datasets", "yAxes"],
  components: {
    LineChart,
  },
  data() {
    return {
      datacollection: {},
      defaultYAxes: {
        ticks: {
          beginAtZero: true,
          callback: function (value, index, values) {
            return "$" + value;
          },
        },
      },
    };
  },
  methods: {
    fillData() {
      this.datacollection = { labels: this.labels, datasets: this.datasets };
    },
  },
  watch: {
    datasets: {
      handler() {
        this.fillData();
      },
    },
    labels: {
      handler() {
        this.fillData();
      },
    },
  },
};
</script>
