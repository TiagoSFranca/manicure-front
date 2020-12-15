<template>
  <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
export default {
  props: [
    "height",
    "options",
    "labels",
    "series",
    "colors",
    "curve",
    "dataLabel",
    "theme",
  ],
  data() {
    return {
      chartOptions: {
        chart: {
          zoom: false,
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: this.labels,
        },
        dataLabels: {
          enabled: this.dataLabel == true,
        },
        stroke: {
          curve: this.curve || "smooth",
        },
        colors: this.colors,
        theme: {
          mode: this.theme || "dark",
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
    };
  },
};
</script>
