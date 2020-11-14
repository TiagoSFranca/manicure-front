<template>
  <v-card :loading="isLoading" height="100%">
    <v-card-title>
      <span class="overline">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-sheet class="v-sheet--offset mx-auto" color="cyan" elevation="12">
          <v-sparkline
            :labels="labels"
            :value="value"
            color="white"
            line-width="2"
            padding="16"
          ></v-sparkline>
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
  props: ["combos", "isLoading", "title"],
  data: () => ({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    value: [200, 675, 410, 390, 310, 460, 250, 240, 0, 0, 0, 0],
  }),
  methods: {
    seeCombo(combo) {
      this.$router.push({ path: "/GOOGLE".replace(":id", combo.id) });
    },
  },
};
</script>