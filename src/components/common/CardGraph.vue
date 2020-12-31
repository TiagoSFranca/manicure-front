<template>
  <v-card :loading="isLoading" :disabled="isLoading">
    <v-card-title>
      <span class="overline">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <common-chart
        :labels="labels"
        :series="series"
        :colors="colors"
        :type="type"
        :height="height"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: [
    "labels",
    "isLoading",
    "title",
    "series",
    "options",
    "colors",
    "type",
    "height",
  ],
};
</script>