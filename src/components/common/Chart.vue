<template>
  <apexchart
    :type="type || 'bar'"
    :options="chartOptions"
    :series="series"
    :height="height || 300"
  ></apexchart>
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
    "type",
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
          horizontalAlign: "center",
          floating: true,
        },
      },
    };
  },
};
</script>
