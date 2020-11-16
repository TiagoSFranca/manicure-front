<template>
  <v-card :loading="isLoading">
    <v-card-title>
      <span class="overline">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-sheet class="v-sheet--offset mx-auto" color="gray" elevation="7">
          <common-charts-line :data="datacollection" />
        </v-sheet>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import productsActions from "@/actions/productsActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";

export default {
  props: ["labels", "isLoading", "title", "datasets", "options"],
  data() {
    return {
      datacollection: {
        labels: this.labels || [],
        datasets: this.datasets,
      },
    };
  }
};
</script>