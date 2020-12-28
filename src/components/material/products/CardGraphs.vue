<template>
  <v-card :loading="isLoading">
    <v-card-title>
      <span class="overline">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <common-charts-line :data="datacollection" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["labels", "isLoading", "title", "datasets", "options"],
  data() {
    return {
      datacollection: {
        labels: this.labels || [],
        datasets: this.datasets,
      },
    };
  },
};
</script>
