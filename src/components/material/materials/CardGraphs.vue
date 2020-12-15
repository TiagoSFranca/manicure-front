<template>
  <v-card :loading="isLoading" :disabled="isLoading">
    <v-card-title>
      <span class="overline">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <v-sheet class="v-sheet--offset mx-auto" color="gray" elevation="7">
        <common-charts-line
          :labels="labels"
          :series="series"
          :colors="colors"
        />
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import productsActions from "@/actions/productsActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";

export default {
  props: ["labels", "isLoading", "title", "series", "options", "colors"],
};
</script>